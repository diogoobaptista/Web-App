package server.Models

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "comment")
data class Comment(
    @Id
    @Column(name = "id", updatable = false)
    val commentId : Int,
    @Column(name = "ttext", nullable = false, columnDefinition = "TEXT")
    var description : String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "created")
    val date : LocalDateTime,
    @Column(name = "project_id")
    val projectId : Int,
    @Column(name = "issue_id")
    val issueId : Int,
    @Column(name = "comment_owner")
    val commentOwner : String
)
{
    private constructor(): this(0, "", LocalDateTime.now(),0,0,"")
}