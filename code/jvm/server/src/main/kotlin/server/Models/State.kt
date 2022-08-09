package server.Models

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "state")
class State (
    @Id
    @Column(name = "id")
    val stateId: Int,
    @Column(name = "name")
    val name: String
){
    private constructor(): this(0, "")
}