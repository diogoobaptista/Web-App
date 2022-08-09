package server.Controllers

import server.Models.Requests.ProjectRequest
import server.Services.ProjectsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/projects")
@CrossOrigin( origins = arrayOf("http://localhost:8080"))
class ProjectsController(@Autowired val service: ProjectsService)
{
    /** Projects Requests **/

    @GetMapping
    fun getProjects(): ResponseEntity<String>?
    {
        return service.getProjects()
    }

    @GetMapping("/{projectId}")
    fun getProject(@PathVariable projectId: Int): ResponseEntity<String>
    {
        return service.getProject(projectId)
    }

    @PostMapping
    fun createProject(@RequestBody body : ProjectRequest): ResponseEntity<String>
    {

        val nextProjectId = service.getNextProjectId()
        return service.addProject(nextProjectId, body.name, body.description)
    }

    @PutMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateProject(@PathVariable projectId: Int,
                      @RequestBody body : ProjectRequest
    ) : ResponseEntity<String>
    {
        return service.updateProject(projectId, body.name, body.description)
    }

    @DeleteMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProject(@PathVariable projectId: Int) : ResponseEntity<String>
    {
        return service.deleteProject(projectId)
    }
}