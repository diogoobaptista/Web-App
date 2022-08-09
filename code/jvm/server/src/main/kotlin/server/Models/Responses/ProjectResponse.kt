package server.Models.Responses

data class ProjectResponse(
    val projectOwner : String,
    val projectId: Int,
    val name: String,
    val description: String,
    var issuesIds : List<Int>?
)

data class ProjectsResponse(
    val projects : List<ProjectResponse>,
    val TotalCount : Int
    )