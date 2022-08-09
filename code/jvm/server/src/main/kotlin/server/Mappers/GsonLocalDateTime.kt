package server.Mappers

import com.google.gson.*
import java.lang.reflect.Type
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter


class GsonLocalDateTime : JsonSerializer<LocalDateTime>,
    JsonDeserializer<LocalDateTime> {
    @Throws(JsonParseException::class)
    override fun deserialize(
        jsonElement: JsonElement,
        type: Type,
        jsonDeserializationContext: JsonDeserializationContext
    ): LocalDateTime {
        val ldtString = jsonElement.asString
        return LocalDateTime.parse(ldtString, DateTimeFormatter.ISO_LOCAL_DATE_TIME)
    }

    override fun serialize(
        localDateTime: LocalDateTime,
        type: Type,
        jsonSerializationContext: JsonSerializationContext
    ): JsonElement {
        return JsonPrimitive(localDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
    }
}