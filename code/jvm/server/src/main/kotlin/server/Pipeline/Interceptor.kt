package server.Pipeline

import server.Services.AuthenticationService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.servlet.HandlerInterceptor
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class Interceptor(
    private val authenticationService : AuthenticationService
) : HandlerInterceptor {


    fun getCookie(req: HttpServletRequest, name: String?): String {
        val cookies: Array<Cookie>? = req.cookies
        if (cookies != null) {
            for (cookie in cookies) {
                if (cookie.name.equals(name) && !cookie.value.equals("")) {
                    return cookie.value.toString()
                }
            }
        }
        return ""
    }

    override fun preHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any): Boolean {

        if (request.method == "OPTIONS") return true
        val httpRequest = request as HttpServletRequest
        val httpResponse = response as HttpServletResponse
        val cookieValue = getCookie(httpRequest, "Bearer")
        val path = request.getRequestURI()
        if(path != "/login" && path != "/register" && !authenticationService.authenticateUser(cookieValue))
        {
            httpResponse.status = HttpServletResponse.SC_UNAUTHORIZED
            return false
        } else {
            authenticationService.setUsername(authenticationService.getUsernameByBearer(cookieValue))
            return true
        }
    }

    companion object {

        private val logger: Logger = LoggerFactory.getLogger(Interceptor::class.java)
    }

}