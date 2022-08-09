package server.Exceptions

import org.springframework.http.HttpStatus

open class ErrorException(
    var title: String,
    val status: HttpStatus,
    var detail: String?
)


class ErrorNotFound : ErrorException("",HttpStatus.NOT_FOUND,"" )

class ErrorBadRequest : ErrorException("", HttpStatus.BAD_REQUEST, "")

class ErrorUnauthorized : ErrorException("", HttpStatus.UNAUTHORIZED, "")

class ErrorForbidden : ErrorException("", HttpStatus.FORBIDDEN, "")

class ErrorInternalServerError : ErrorException("", HttpStatus.INTERNAL_SERVER_ERROR, "")



