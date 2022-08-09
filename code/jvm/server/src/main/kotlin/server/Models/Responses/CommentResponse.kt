package server.Models.Responses

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

data class CommentResponse(
    val commentId : Int,
    val description : String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val date : LocalDateTime,
    val commentOwner : String
)

data class CommentsResponse(
    val projectId : Int,
    val issueId : Int,
    val comments : List<CommentResponse>
)