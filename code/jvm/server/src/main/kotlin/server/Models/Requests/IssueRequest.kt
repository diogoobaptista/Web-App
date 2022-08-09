package server.Models.Requests

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

class IssueCreateRequest(
    val name: String,
    val description: String,
    val state: String
)

class IssueUpdateRequest(
    val name: String,
    val description: String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    val endDate : LocalDateTime?,
    val state: String,
    val label: String?
)