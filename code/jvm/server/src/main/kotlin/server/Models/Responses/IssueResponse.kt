package server.Models.Responses

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

data class IssueResponse (
    val id : Int,
    val name : String,
    val description : String,
    var state : String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val createDate : LocalDateTime,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val closeDate : LocalDateTime?,
    var label : String?,
    var issueOwner : String,
    var commentsIds : List<Int>?
    )

data class IssuesResponse(
    var projectId: Int,
    var TotalIssues: Int,
    var issues : List<IssueResponse>
)