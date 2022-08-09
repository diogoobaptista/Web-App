package server.Repo

import server.Models.Issue
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface IssueRepository : JpaRepository<Issue, Int>

