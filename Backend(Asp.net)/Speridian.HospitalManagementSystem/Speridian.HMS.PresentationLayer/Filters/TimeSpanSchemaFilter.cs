using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Speridian.HMS.PresentationLayer.Filters
{
    public class TimeSpanSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (context.Type == typeof(TimeSpan))
            {
                schema.Type = "string";
                schema.Format = "time"; // Use "time" format for Swagger
            }
        }
    }

}
