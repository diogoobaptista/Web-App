package server.Models

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "label")
class Label (
    @Id
    @Column(name = "id")
    val labelId: Int,
    @Column(name = "name")
    val name: String
){
    private constructor(): this(0, "")
}