package server.Services

import com.google.gson.Gson
import server.Exceptions.ErrorException
import server.Mappers.Mappers
import server.Models.User
import server.Repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.security.MessageDigest

@Service
class AuthenticationService(@Autowired val repo: UserRepository) {

    private var username: String = ""
    val gson = Gson()

    fun getHash(value : String) : String {
        val charset = Charsets.UTF_8
        val algorithm: MessageDigest = MessageDigest.getInstance("SHA-256")
        val messageDigest: ByteArray = algorithm.digest(value.toByteArray(charset))

        val hexString = StringBuilder()
        for (b in messageDigest) {
            hexString.append(String.format("%02X", 0xFF and b.toInt()))
        }
        return hexString.toString()
    }
    fun getUsername(): String {
        return username
    }
    fun setUsername(name: String){
        username = name
    }

    fun getUsernameByBearer(bearer: String): String {
        val user =  repo.findAll().filter { getHash(it.username) + it.password == bearer }.firstOrNull()
        return if(user != null){
            user.username
        } else {
            ""
        }
    }

    fun authenticateUser(bearer : String) : Boolean
    {
        val acessTokens = repo.findAll().map { getHash(it.username) + it.password }
        return acessTokens.contains(bearer)
    }

    fun login(username: String, password: String) : ResponseEntity<String>{
        val token = getHash(username) + getHash(password)
        val response = Mappers.loginResponse(token)
        val acessTokens = repo.findAll().map { getHash(it.username) + it.password }
        return if(acessTokens.contains(token)){
            ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(response))
        }else {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Users Not Found", HttpStatus.NOT_FOUND, "No users found")))
        }
    }

    fun addUser(username: String, password: String) : ResponseEntity<String>{
        val pass = getHash(password)
        return try {
            val user = User(username, pass)
            repo.save(user)
            ResponseEntity.status(HttpStatus.CREATED)
                .body("User " + user.username + " created with success")
        } catch ( e :IllegalArgumentException){
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("User not created",HttpStatus.BAD_REQUEST,"Error while creating user" )))
        }
    }

    fun unauthorizedResponse() : ResponseEntity<String>
    {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .contentType(MediaType.APPLICATION_JSON)
            .body(gson.toJson(ErrorException("User Unauthorized",HttpStatus.UNAUTHORIZED,"This request is not authorized.")))
    }

    fun getUsers() : ResponseEntity<String>
    {
        val users = repo.findAll()
        return if(users.isNotEmpty())
            ResponseEntity.status(HttpStatus.OK)
                .body(gson.toJson(Mappers.userResponseFromUser(users)))
        else {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(ErrorException("Users Not Found", HttpStatus.NOT_FOUND, "No users found")))
        }
    }
}