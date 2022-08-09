package server.Controllers

import server.Models.Requests.AuthenticationRequest
import server.Services.AuthenticationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin("http://localhost:8080")
class AuthenticationController(@Autowired val authenticationService : AuthenticationService)
{
    @PostMapping("/register")
    fun registerNewUser(@RequestBody user: AuthenticationRequest) : ResponseEntity<String>
    {
        return authenticationService.addUser(user.username, user.password)
    }

    @GetMapping("/users")
    fun getUsers() : ResponseEntity<String>
    {
        return authenticationService.getUsers()
    }

    @PostMapping("/login")
    fun login(@RequestHeader("username", required = true) username : String,
              @RequestHeader("password", required = true) password : String) : ResponseEntity<String>
    {
        return authenticationService.login(username, password)
    }

}
