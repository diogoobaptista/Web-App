package server.Services

import com.google.gson.GsonBuilder
import server.Exceptions.ErrorException
import server.Mappers.GsonLocalDateTime
import server.Mappers.Mappers
import server.Models.Comment
import server.Repo.CommentRepository
import server.Repo.IssueRepository
import server.Repo.ProjectRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.time.LocalDateTime


@Service
class CommentService(@Autowired val repoComment: CommentRepository,
                     @Autowired val repoProject: ProjectRepository,
                     @Autowired val repoIssue: IssueRepository,
                     @Autowired val authenticationService : AuthenticationService,
) {

    /** Comments Requests **/
    final val gsonBuilder = GsonBuilder().registerTypeAdapter(LocalDateTime::class.java, GsonLocalDateTime())
    val gson = gsonBuilder.create()

    fun getNextCommentId(): Int
    {
        var res = 0
        val last = repoComment.findAll().lastOrNull()
        if (last != null) {
            res = last.commentId
        }
        return res + 1
    }

    fun noExistProject(projectId: Int): Boolean
    {
        return repoProject.findAll().none { it.projectId == projectId }
    }

    fun existIssueNotArchived(issueId: Int): Boolean
    {
        return repoIssue.findAll().filter { it.id == issueId && it.stateId != 5 }.isNotEmpty()
    }

    fun getComments(projectId: Int, issueId: Int): ResponseEntity<String>
    {
        val comments = repoComment.findAll().filter { it.issueId == issueId && it.projectId == projectId }
        return ResponseEntity.status(HttpStatus.OK)
            .contentType(MediaType.APPLICATION_JSON)
            .body(gson.toJson(
                Mappers.commentResponseFromComment(
                projectId, issueId, comments)))
    }

    fun getComment(commentId: Int, projectId: Int, issueId: Int): ResponseEntity<String>
    {
        val comment = repoComment.findAll().filter { it.issueId == issueId && it.projectId == projectId && it.commentId == commentId }
        return if(comment.isNotEmpty())
            ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(repoComment.findById(commentId).get()))
        else {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Comment Not Found", HttpStatus.NOT_FOUND, "No comments found in this issue/project")))
        }
    }


    fun createComment(commentId: Int, description: String, created: LocalDateTime, projectId: Int, issueId: Int ): ResponseEntity<String>
    {
        return if (!noExistProject(projectId) && existIssueNotArchived(issueId)) {
            val nextCommentId = getNextCommentId()
            val p = Comment(nextCommentId, description, LocalDateTime.now(), projectId, issueId, authenticationService.getUsername())
            repoComment.save(p)
            ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.LOCATION, "/api/projects/" + projectId + "/issues/" + issueId + "/comments/" + commentId)
                .body(gson.toJson(p))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(
                    ErrorException("Issue Conflict",
                        HttpStatus.NOT_FOUND,"IssueID or ProjectID does not exist" )
                ))
        }
    }

    fun deleteComment(commentId: Int, issueId: Int): ResponseEntity<String>
    {
        val comment = repoComment.findAll().filter { it.issueId == issueId && it.commentId == commentId
                                                            && it.commentOwner == authenticationService.getUsername() }
        return if(comment.isNotEmpty()){
            repoComment.delete(comment.first())
            ResponseEntity.status(HttpStatus.OK)
                .body("Comment deleted successful")
        } else{
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Comment id not exist or you're not the owner of the comment" )))
        }
    }

    fun updateComment(commentId: Int, newDescription: String): ResponseEntity<String>
    {
        val comment = repoComment.findAll().first { it.commentId == commentId }
        return if(comment != null){
            comment.description = newDescription
            repoComment.save(comment)
            ResponseEntity.status(HttpStatus.OK)
                .body("Comment with id:$commentId updated successful")
        }else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Id Not Found",HttpStatus.NOT_FOUND,"Comment id:$commentId not exist for this user" )))
        }
    }
}