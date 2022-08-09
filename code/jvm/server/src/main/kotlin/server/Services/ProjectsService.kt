package server.Services

import com.google.gson.Gson
import server.Exceptions.ErrorException
import server.Mappers.Mappers
import server.Models.Issue
import server.Models.Project
import server.Repo.IssueRepository
import server.Repo.ProjectRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service


@Service
class ProjectsService(@Autowired val projectRepo: ProjectRepository,
                      @Autowired val issueRepo: IssueRepository,
                      @Autowired val authenticationService : AuthenticationService
)
{
    /** Projects Requests **/
    val gson = Gson()
    fun getNextProjectId(): Int
    {
        var res = 0
        val last = projectRepo.findAll().lastOrNull()
        if (last != null) {
            res = last.projectId
        }
        return res + 1
    }

    fun getProjectIssues(projectId: Int): List<Issue>
    {
        return issueRepo.findAll().filter { it.projectId == projectId }
    }

    fun getProjects(): ResponseEntity<String>?
    {
        val projects = projectRepo.findAll()
        return if(projects.size > 0) {
            val projectResponse = Mappers.projectsResponseFromProjects(projects)
            projectResponse.projects.forEach {project -> project.issuesIds = getProjectIssues(project.projectId).map { it.id }}
            ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(projectResponse))
        } else{
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Projects Not Found", HttpStatus.NOT_FOUND, "No projects found please create a project")))
        }
    }


    fun existUserInProject(username: String, name: String): Boolean
    {
        return projectRepo.findAll()
            .filter { it.projectOwner == username && it.name == name }.isNotEmpty()
    }


    fun getProject(projectId : Int): ResponseEntity<String>
    {
        return try {
            val project = projectRepo.findById(projectId).get()
            val projectResponse = Mappers.projectResponseFromProject(project)
            projectResponse.issuesIds = getProjectIssues(projectResponse.projectId).map { it.id }
            ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(projectResponse))
        }catch (e :NoSuchElementException){
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Project id not exist for this user" )))
        }
    }

    fun addProject(projectId : Int, name : String, description: String): ResponseEntity<String>
    {
        val username = authenticationService.getUsername()
        return if (!existUserInProject(username,name)) {
            val p = Project(username, projectId, name, description)
            projectRepo.save(p)

            ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.LOCATION, "/api/projects/" + projectId)
                .body(gson.toJson(p))
        } else {
            ResponseEntity.status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Project Conflict",HttpStatus.CONFLICT,"Project already exist for this user" )))
        }
    }

    fun updateProject(projectId : Int, newName : String, newDescription: String): ResponseEntity<String>
    {
        val project = projectRepo.findAll().filter { it.projectId == projectId && it.projectOwner == authenticationService.getUsername() }.last()
        return if(project != null){
            project.name = newName
            project.description = newDescription
            projectRepo.save(project)
            ResponseEntity.status(HttpStatus.OK)
                .body("Project with id:$projectId updated successful")
        }else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Project id not exist for this user" )))
        }
    }


    fun deleteProject(projectId: Int): ResponseEntity<String>
    {
        val project = projectRepo.findAll().filter { it.projectId == projectId && it.projectOwner == authenticationService.getUsername() }
        return if(project.isNotEmpty()){
            projectRepo.delete(project.first())
            ResponseEntity.status(HttpStatus.OK)
                .body("Project deleted successful")
        } else{
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Project id does not exist or you are not the owner of the project")))
        }
    }
}