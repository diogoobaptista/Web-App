package server.Mappers

import server.Models.Requests.IssueCreateRequest
import server.Models.Comment
import server.Models.Issue
import server.Models.Project
import server.Models.Responses.*
import server.Models.User
import java.time.LocalDateTime

class Mappers {

     companion object Map {

         fun projectsResponseFromProjects(projects : Collection<Project>) : ProjectsResponse
         {
            val projectsResponse = projects
                .stream()
                .map { project -> projectResponseFromProject(project)
                }
             val projectsResponseList = projectsResponse.toList();
            return ProjectsResponse(projectsResponseList, projectsResponseList.size)
         }

         fun projectResponseFromProject(project: Project): ProjectResponse
         {
             return ProjectResponse(
                 projectOwner = project.projectOwner,
                 projectId = project.projectId,
                 name = project.name,
                 description = project.description,
                 listOf<Int>()
             )
         }


         fun issuesResponseFromIssues(issues : Collection<Issue>) : IssuesResponse
         {
             val issuesResponse = issues
                 .stream()
                 .map { issue -> issueResponseFromIssue(issue) }
             val issuesResponseList = issuesResponse.toList();
             return IssuesResponse(0, issuesResponseList.size,issuesResponseList)
         }

         fun issueResponseFromIssue(issue : Issue): IssueResponse
         {
             var label : String? = null
             if(issue.labelId != null)
                 label = issue.labelId.toString()

             return IssueResponse(
                 id = issue.id,
                 name = issue.name,
                 description = issue.description,
                 state = issue.stateId.toString(),
                 createDate = issue.createDate,
                 closeDate = issue.closeDate,
                 label = label,
                 issueOwner = issue.issueOwner,
                 listOf<Int>())
         }

         fun issueFromIssueCreateRequest(issueCreateRequest: IssueCreateRequest, projectId: Int, issueId: Int
                                         , stateId : Int, username : String) : Issue
         {
                return Issue(
                    issueId,
                    issueCreateRequest.name,
                    issueCreateRequest.description,
                    LocalDateTime.now(),
                    null,
                    stateId,
                    projectId,
                null,
                    username)
         }


         fun commentResponseFromComment(projectId: Int,issueId: Int, comments : Collection<Comment>) : CommentsResponse
         {
             val commentsResponse = comments
                 .stream()
                 .map { comment -> CommentResponse(
                     commentId = comment.commentId,
                     date = comment.date,
                     description = comment.description,
                     commentOwner = comment.commentOwner,
                 )
                 }
             val commentsResponseList = commentsResponse.toList();
             return CommentsResponse(projectId,issueId,commentsResponseList)
         }

         fun userResponseFromUser( users : Collection<User>) : UsersResponse
         {
             val usersResponse = users
                 .stream()
                 .map { user -> UserResponse(
                     username = user.username
                 )
                 }
             val usersResponseList = usersResponse.toList();
             return UsersResponse(usersResponseList)
         }

         fun loginResponse(token : String) : LoginResponse
         {
             return LoginResponse(token)
         }

     }
}