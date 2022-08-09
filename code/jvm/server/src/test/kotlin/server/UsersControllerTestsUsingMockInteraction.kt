package server

import org.hamcrest.Matchers
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers


@SpringBootTest
@AutoConfigureMockMvc
class UsersControllerTestsUsingMockInteraction {

    @Autowired
    private lateinit var client: MockMvc

    @Test
    fun `shouldCreateMvc`()
    {
        Assertions.assertNotNull(client)
    }
    @Test
    fun `GET getAllUsers`() {
        this.client
            .perform(
                MockMvcRequestBuilders
                    .get("/users")
            )
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.usernames.size()", Matchers.`is`(3)))
    }

    @Test
    fun `Create User`() {
        this.client
            .perform(
                MockMvcRequestBuilders
                    .post("/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"username\": \"NewUser\", \"password\": \"pass\"}"))
            .andExpect(MockMvcResultMatchers.status().isCreated())
    }

    @Test
    fun `GET login - 200`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/login")
                .header("username", "inesn")
                .header("password", "password"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }


    @Test
    fun `GET login - 404`()
    {
        this.client
            .perform(MockMvcRequestBuilders
                .get("/login")
                .header("username", "usertest")
                .header("password", "usertest"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }
}
