package server.Models

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "issue")
class Issue (
    @Id
    @Column(name = "id")
    val id : Int,
    @Column(name = "name")
    var name : String,
    @Column(name = "description")
    var description : String,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "created")
    val createDate : LocalDateTime,
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "closed")
    var closeDate : LocalDateTime?,
    @Column(name = "state_id")
    var stateId : Int,
    @Column(name = "project_id")
    val projectId : Int,
    @Column(name = "label_id")
    var labelId : Int?,
    @Column(name = "issue_owner")
    val issueOwner : String
){
    private constructor(): this(0,"","", LocalDateTime.now(), LocalDateTime.now(),0,0,0,"")
}