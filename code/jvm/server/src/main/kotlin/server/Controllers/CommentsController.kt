package server.Controllers

import server.Models.Requests.CommentRequest
import server.Services.CommentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/projects/{projectId}/issues/{issueId}/comments")
@CrossOrigin("http://localhost:8080")
class CommentsController(@Autowired val service : CommentService) {
    /** Comments Requests **/

    @GetMapping
    fun getComments(@PathVariable projectId: Int,
                    @PathVariable issueId: Int): ResponseEntity<String> {
        return service.getComments(projectId, issueId)
    }

    @GetMapping("/{commentId}")
    fun getComment(@PathVariable commentId: Int,
                   @PathVariable projectId: Int,
                   @PathVariable issueId: Int): ResponseEntity<String> {
        return service.getComment(commentId, projectId, issueId)
    }

    @PostMapping
    fun createComment(@PathVariable projectId: Int,
                      @PathVariable issueId: Int,
                      @RequestBody body : CommentRequest
    ): ResponseEntity<String>
    {
        val nextCommentId = service.getNextCommentId()
        return service.createComment(nextCommentId, body.description, LocalDateTime.now(), projectId, issueId)
    }

    @DeleteMapping("/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteComment(@PathVariable commentId: Int,
                      @PathVariable issueId: Int): ResponseEntity<String>
    {
        return service.deleteComment(commentId, issueId)
    }

    @PutMapping("/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateComment(@PathVariable commentId: Int,
                      @RequestBody body : CommentRequest
    ) : ResponseEntity<String>
    {
        return service.updateComment(commentId, body.description)
    }
}