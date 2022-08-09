package server.Models

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table


@Entity
@Table(name = "project")
data class Project(
    @Column(name = "project_owner")
    val projectOwner : String,
    @Id
    @Column(name = "id")
    val projectId: Int,
    @Column(name = "name")
    var name: String,
    @Column(name = "description")
    var description: String
) {
    private constructor(): this("", 0,"","")
}