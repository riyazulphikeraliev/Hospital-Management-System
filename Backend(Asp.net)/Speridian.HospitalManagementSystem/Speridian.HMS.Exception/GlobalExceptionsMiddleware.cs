using Microsoft.AspNetCore.Http;
using Speridian.HMS.Exception;
using System.Net;

namespace Speridian.HMS.Exceptions
{
    public class GlobalExceptionsMiddleware
    {
        private readonly RequestDelegate _next;
        public GlobalExceptionsMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var response = context.Response;
                response.ContentType = "application/json";
                switch (ex)
                {
                    case HMSExceptions e:
                        response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        Serilog.Log.Error(e.Message);
                        break;
                    case BadHttpRequestException e:
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        break;
                    case KeyNotFoundException e:
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }
                var result = System.Text.Json.JsonSerializer.Serialize(new { Error = ex?.Message });
                await response.WriteAsync(result);
            }
        }
    }
}
