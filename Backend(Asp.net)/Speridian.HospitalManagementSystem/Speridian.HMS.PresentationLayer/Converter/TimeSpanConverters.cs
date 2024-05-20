using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class TimeSpanConverters : JsonConverter<TimeSpan>
{
    public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var timeString = reader.GetString();
        if (TimeSpan.TryParse(timeString, out var result))
        {
            return result;
        }
        return TimeSpan.Zero;
    }

    public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("c")); // "c" format specifier represents the complete time format
    }

}

