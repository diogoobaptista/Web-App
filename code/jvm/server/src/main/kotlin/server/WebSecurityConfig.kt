package server.server

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
@EnableWebMvc
class WebConfig(
    private val interceptors: List<HandlerInterceptor>
) : WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        interceptors.forEach {
            registry.addInterceptor(it)
        }
    }
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:8080")
            .allowedMethods("*")
            .allowCredentials(true)
    }
}