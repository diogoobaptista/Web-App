package server.Controllers

import server.Models.Requests.IssueCreateRequest
import server.Models.Requests.IssueUpdateRequest
import server.Services.IssueService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/projects/{projectId}/issues")
@CrossOrigin("http://localhost:8080")
class IssuesController(@Autowired val service : IssueService) {


    /** Issues Requests **/

    @GetMapping("")
    fun getIssues(@PathVariable projectId: Int) : ResponseEntity<String> {
        return service.getIssues(projectId)
    }

    @GetMapping("/{issueId}")
    fun getIssue(@PathVariable projectId: Int,
                 @PathVariable issueId: Int) : ResponseEntity<String> {
        return service.getIssue(projectId, issueId)
    }

    @PostMapping("")
    fun createIssue(@RequestBody issue : IssueCreateRequest,
                    @PathVariable projectId: Int) : ResponseEntity<String>
    {
        return service.createIssue(issue, projectId)
    }

    @DeleteMapping("/{issueId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteIssue(@PathVariable projectId: Int,
                    @PathVariable issueId: Int) : ResponseEntity<String>
    {
        return service.deleteIssue(projectId, issueId)
    }

    @PutMapping("/{issueId}")
    fun updateIssue(@PathVariable projectId: Int,
                    @PathVariable issueId: Int,
                    @RequestBody issueUpdateRequest: IssueUpdateRequest
    ) : ResponseEntity<String>
    {
        return service.updateIssue(projectId, issueId,issueUpdateRequest)
    }

}
