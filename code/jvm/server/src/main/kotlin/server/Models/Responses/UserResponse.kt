package server.Models.Responses

data class UserResponse(
    val username : String
)

data class UsersResponse(
    val usernames : List<UserResponse>
)