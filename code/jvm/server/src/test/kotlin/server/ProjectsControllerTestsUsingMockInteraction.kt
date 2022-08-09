package server

import org.hamcrest.Matchers
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers


@SpringBootTest
@AutoConfigureMockMvc
class ProjectsControllerTestsUsingMockInteraction {

    @Autowired
    private lateinit var client: MockMvc

    val bearer = "A0539F59D370F15EA8CC0F0062942888DF62D28CB9CCC3975064A57CB87312E45986BDE91DB988EBF22BC8AB401D83AF9BFC9714EF4AFE2415AD8B02C8A98743"

    @Test
    fun `shouldCreateMvc`()
    {
        assertNotNull(client)
    }

    @Test
    fun `GET getAllProjects - 200`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects")
                .header("bearer", bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.projects.size()", Matchers.`is`(4)))
    }

    @Test
    fun `GET getProject with id = 1 - 200`()
    {
        val projectId = "1"
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects/"+projectId)
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.name", Matchers.`is`("DAW Project")))
    }

    @Test
    fun `GET getProject with non existing id - 404`()
    {
        val projectId = "10000"
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects/"+projectId)
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun `POST Create Project - 201`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .post("/api/projects")
                .header("bearer",bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"projeTest\", \"description\": \"DescriptionTest\"}"))

            .andExpect(MockMvcResultMatchers.status().isCreated)
    }

    @Test
    fun `PUT Update Projec with id = 5 - 200`()
    {
        val projectId = "5"
        this.client
            .perform(MockMvcRequestBuilders
                .put("/api/projects/"+projectId)
                .header("bearer",bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"NewProjectName\", \"description\": \"DescriptionTest\"}"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun `Failed authentication for user - 401`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects")
                .header("bearer", "ricky"))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized)
    }

    @Test
    fun `Delete Project with wrong projectOwner - 401`()
    {
        val projectId = "5"
        this.client
            .perform(MockMvcRequestBuilders
                .delete("/api/projects/" + projectId)
                .header("bearer", "82022D64C5011287E605815B07CAA83BE1FF7EC798C0C7E22F5DD10C9DE6A6285E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8")
            )
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun `Delete Project - 200`()
    {
        val projectId = "5"
        this.client
            .perform(MockMvcRequestBuilders
                .delete("/api/projects/" + projectId)
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

}