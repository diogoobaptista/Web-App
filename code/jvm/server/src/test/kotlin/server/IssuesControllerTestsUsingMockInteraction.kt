package server

import org.hamcrest.Matchers
import org.junit.jupiter.api.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class IssuesControllerTestsUsingMockInteraction {

    @Autowired
    private lateinit var client: MockMvc

    val bearer = "A0539F59D370F15EA8CC0F0062942888DF62D28CB9CCC3975064A57CB87312E45986BDE91DB988EBF22BC8AB401D83AF9BFC9714EF4AFE2415AD8B02C8A98743"

    @Test
    fun `shouldCreateMvc`()
    {
        Assertions.assertNotNull(client)
    }

    @Test
    fun `GET getAllIssues - 200`()
    {
        this.client
            .perform(
                MockMvcRequestBuilders
                .get("/api/projects/1/issues")
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.TotalIssues", Matchers.`is`(1)))
    }

    @Test
    fun `GET getIssue with id = 4 - 200`()
    {
        val issueId = "4"
        this.client
            .perform(
                MockMvcRequestBuilders
                .get("/api/projects/2/issues/"+issueId)
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.issueOwner", Matchers.`is`("ricky")))
    }

    @Test
    fun `GET getIssue with non existing id - 404`()
    {
        val issueId = "10000"
        this.client
            .perform(
                MockMvcRequestBuilders
                .get("/api/projects/2/issues/"+issueId)
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun `POST Create Issue - 201`()
    {
        this.client
            .perform(
                MockMvcRequestBuilders
                .post("/api/projects/2/issues")
                .header("bearer", bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"IssueTest\", \"description\": \"DescriptionTest\", \"state\":\"Open\"}"))

            .andExpect(MockMvcResultMatchers.status().isCreated)
    }

    @Test
    fun `PUT Update Projec with id = 5 - 200`()
    {
        val issueId = "3"
        this.client
            .perform(
                MockMvcRequestBuilders
                .put("/api/projects/2/issues/" + issueId)
                .header("bearer", bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"NewProjectName\", \"description\": \"DescriptionTest\", \"state\":\"closed\"}"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `Failed authentication for user - 401`()
    {
        this.client
            .perform(
                MockMvcRequestBuilders
                .get("/api/projects/1/issues")
                .header("bearer", "asas"))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized)
    }

    @Test
    fun `Delete Issue with wrong IssueOwner - 401`()
    {
        val projectId = "5"
        this.client
            .perform(
                MockMvcRequestBuilders
                .delete("/api/projects/2/issues/4")
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized)
    }

    @Test
    fun `Delete Project - 200`()
    {
        this.client
            .perform(
                MockMvcRequestBuilders
                .delete("/api/projects/2/issues/3")
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }
}