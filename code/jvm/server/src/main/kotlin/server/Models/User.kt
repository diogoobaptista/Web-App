package server.Models

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "user_info")
class User(
    @Id
    @Column(name = "username")
    val username: String,
    @Column(name = "password")
    val password: String
){
    private constructor(): this("", "")
}
