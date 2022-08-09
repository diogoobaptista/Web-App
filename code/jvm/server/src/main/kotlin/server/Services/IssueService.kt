package server.Services

import com.google.gson.GsonBuilder
import server.Exceptions.ErrorException
import server.Mappers.GsonLocalDateTime
import server.Mappers.Mappers
import server.Models.Comment
import server.Models.Requests.IssueCreateRequest
import server.Models.Requests.IssueUpdateRequest
import server.Repo.CommentRepository
import server.Repo.IssueRepository
import server.Repo.LabelRepository
import server.Repo.StateRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDateTime


@Service
class IssueService(@Autowired val issueRepo: IssueRepository,
                   @Autowired val commentRepo: CommentRepository,
                   @Autowired val labelRepo: LabelRepository,
                   @Autowired val stateRepo: StateRepository,
                   @Autowired val authenticationService : AuthenticationService
) {

    final val gsonBuilder = GsonBuilder()
        .registerTypeAdapter(LocalDateTime::class.java, GsonLocalDateTime())

    val gson = gsonBuilder.create()

    fun getIssueComments(projectId: Int, issueId: Int): List<Comment>
    {
        return commentRepo.findAll().filter { it.projectId == projectId && it.issueId == issueId }
    }

    fun getLabelName(labelId : Int): String
    {
        return labelRepo.findById(labelId).get().name
        return String()
    }

    fun getLabelId(labelName : String?): Int?
    {
        if(labelName != null)
            return labelRepo.findAll().filter { label -> label.name == labelName }.first().labelId
        return null
    }

    fun getStateId(stateName : String): Int
    {
        return stateRepo.findAll().filter { state -> state.name.equals(stateName) }.first().stateId
    }

    fun getNextIssueId(): Int
    {
        var res = 0
        val lst = issueRepo.findAll()
        repeat(lst.size) { index ->
            if ( res < lst[index].id){
                res = lst[index].id
            }
            println(lst[index])
        }
        return res + 1
    }

    fun getStateName(stateId : Int): String
    {
        return stateRepo.findById(stateId).get().name
        return String()
    }
    /** Issues Requests **/

    fun getIssues(projectId: Int) : ResponseEntity<String>
    {
        val issues = issueRepo.findAll().filter { it.projectId == projectId  }
        val issuesResponse = Mappers.issuesResponseFromIssues(issues)
        issuesResponse.projectId = projectId
        issuesResponse.issues.forEach {issueResponse -> issueResponse.commentsIds = getIssueComments(projectId, issueResponse.id).map { it.commentId }}
        issuesResponse.issues.forEach {issueResponse -> issueResponse.label = issueResponse.label?.toInt()?.let { getLabelName(it) }}
        issuesResponse.issues.forEach {issueResponse -> issueResponse.state = issueResponse.state.toInt().let { getStateName(it) }}

        val aux = gson.toJson(issuesResponse)
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(aux)
    }

    fun getIssue(projectId: Int, issueId: Int) : ResponseEntity<String>
    {
        val issue = issueRepo.findAll().filter { it.projectId == projectId && it.id == issueId}
        if(issue.isNotEmpty())
        {
            val issueResponse = Mappers.issueResponseFromIssue(issue.first())
            val commentsIdList = getIssueComments(projectId, issueResponse.id).map { it.commentId }
            issueResponse.commentsIds = commentsIdList
            issueResponse.label = issueResponse.label?.toInt()?.let { getLabelName(it) }
            issueResponse.state = issueResponse.state?.toInt()?.let { getStateName(it) }
            return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(issueResponse))
        }
        else
        {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Issue Not Found", HttpStatus.NOT_FOUND, "Issue with id = "+issueId+" was not found.")))
        }
    }

    fun createIssue(issueCreateRequest: IssueCreateRequest, projectId: Int):  ResponseEntity<String>
    {
        return try {
            val issueId = getNextIssueId()
            val stateId = getStateId(issueCreateRequest.state)
            val issue = Mappers.issueFromIssueCreateRequest(issueCreateRequest, projectId, issueId, stateId, authenticationService.getUsername())
            issueRepo.save(issue)
            ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.LOCATION, "/api/projects/"+projectId+"/issues/" + issueId)
                .body(gson.toJson(issue))
        }catch (e :NoSuchElementException){
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Bad request",HttpStatus.BAD_REQUEST,"Invalid state value" )))
        }
    }

    fun deleteIssue(projectId: Int, issueId: Int) :  ResponseEntity<String>
    {
        val issue = issueRepo.findAll().filter { it.id == issueId && it.issueOwner == authenticationService.getUsername() }
        return if(issue.isNotEmpty()){
            issueRepo.delete(issue.first())
            ResponseEntity.status(HttpStatus.OK)
                .body("Issue deleted successful")
        } else{
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Issue id not exist or you're not the owner of the comment" )))
        }
    }

    fun updateIssue (projectId: Int, issueId: Int, issueUpdateRequest: IssueUpdateRequest) : ResponseEntity<String>
    {
        val issue = issueRepo.findAll().filter { it.projectId == projectId && it.id == issueId}
        if(issue.size != 0)
        {
            val updateIssue = issue.first()
            updateIssue.name = issueUpdateRequest.name
            updateIssue.description = issueUpdateRequest.description
            updateIssue.closeDate = issueUpdateRequest.endDate
            updateIssue.stateId = getStateId(issueUpdateRequest.state)
            updateIssue.labelId = getLabelId(issueUpdateRequest.label)
            issueRepo.save(updateIssue)

            val issueResponse = Mappers.issueResponseFromIssue(updateIssue)
            issueResponse.label = issueUpdateRequest.label
            issueResponse.state = issueUpdateRequest.state
            issueResponse.commentsIds = getIssueComments(projectId, issueResponse.id).map { it.commentId }

            return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(issueResponse))
        }
        else
        {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Issue Not Found", HttpStatus.NOT_FOUND, "Issue with id = "+issueId+" was not found.")))
        }
    }
}