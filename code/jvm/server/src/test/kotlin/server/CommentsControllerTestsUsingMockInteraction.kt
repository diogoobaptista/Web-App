package server

import org.hamcrest.Matchers
import org.junit.jupiter.api.Assertions
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
class CommentsControllerTestsUsingMockInteraction {

    @Autowired
    private lateinit var client: MockMvc

    val bearer = "A0539F59D370F15EA8CC0F0062942888DF62D28CB9CCC3975064A57CB87312E45986BDE91DB988EBF22BC8AB401D83AF9BFC9714EF4AFE2415AD8B02C8A98743"

    @Test
    fun `shouldCreateMvc`()
    {
        Assertions.assertNotNull(client)
    }

    @Test
    fun `GET getAllComments`()
    {
        this.client
            .perform(
                MockMvcRequestBuilders
                .get("/api/projects/1/issues/1/comments")
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.comments.size()", Matchers.`is`(2)))
    }

    @Test
    fun `GET getCommentId`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects/1/issues/1/comments/2")
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.description", Matchers.`is`("testComme2")))
    }

    @Test
    fun `GET WrongCommentId`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects/1/issues/1/comments/9")
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
    }

    @Test
    fun `Post Comment`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .post("/api/projects/1/issues/1/comments")
                .header("bearer",bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\": \"teste unitário\"}"))
            .andExpect(MockMvcResultMatchers.status().isCreated())
    }

    @Test
    fun `Update Comment`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .put("/api/projects/1/issues/1/comments/1")
                .header("bearer",bearer)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"description\": \"nova descricao\"}"))
            .andExpect(MockMvcResultMatchers.status().isOk())
    }

    @Test
    fun `GET Unauthorized user`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/api/projects/1/issues/1/comments/1")
                .header("bearer", "isel"))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized())
    }

    @Test
    fun `Delete Comment`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .delete("/api/projects/1/issues/1/comments/2")
                .header("bearer",bearer))
                .andExpect(MockMvcResultMatchers.status().isOk())
    }

    @Test
    fun `Delete Comment With Wrong Owner`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .delete("/api/projects/1/issues/1/comments/1")
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
    }

    @Test
    fun `Create Comment With Archived Issue`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .post("/api/projects/2/issues/6/comments/2")
                .header("bearer",bearer))
            .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed())
    }
}