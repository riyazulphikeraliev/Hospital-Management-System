using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Speridian.HMS.BusinessLayer.Services;
using Speridian.HMS.DataAccessLayer.Models;
using Speridian.HMS.DataAccessLayer.Repositories;
using Speridian.HMS.Exceptions;
using Speridian.HMS.Helpers;
using Speridian.HMS.PresentationLayer.Config;
using Speridian.HMS.PresentationLayer.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Log.Logger = new LoggerConfiguration().MinimumLevel.Error().WriteTo.File("Logging/log.txt", rollingInterval: RollingInterval.Day).CreateLogger();
builder.Host.UseSerilog();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]);
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ClockSkew = TimeSpan.Zero
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context => {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
            }
            return Task.CompletedTask;
        }
    };
});
builder.Services.AddDbContext<HospitalManagementSystemWebapiContext>();
builder.Services.AddScoped<DoctorsRepo>();
builder.Services.AddScoped<DoctorsService>();
builder.Services.AddScoped<SpecializationRepo>();
builder.Services.AddScoped<SpecializationService>();
builder.Services.AddScoped<PatientsRepo>();
builder.Services.AddScoped<PatientsService>();
builder.Services.AddScoped<MedicalRecordsRepo>();
builder.Services.AddScoped<MedicalRecordsService>();
builder.Services.AddScoped<AdmissionsRepo>();
builder.Services.AddScoped<AdmissionsService>();
builder.Services.AddScoped<WardsRepo>();
builder.Services.AddScoped<WardsService>();
builder.Services.AddScoped<BillingRepo>();
builder.Services.AddScoped<BillingService>();
builder.Services.AddScoped<StaffRepo>();
builder.Services.AddScoped<StaffService>();
builder.Services.AddScoped<RoleRepo>();
builder.Services.AddScoped<RoleService>();
builder.Services.AddScoped<DoctorScheduleRepo>();
builder.Services.AddScoped<DoctorScheduleService>();
builder.Services.AddScoped<AppointmentRepo>();
builder.Services.AddScoped<AppointmentService>();
builder.Services.AddScoped<AdminService>();
builder.Services.AddScoped<AdminRepo>();
builder.Services.AddScoped<UsersRepo>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<LoginUserRepo>();
builder.Services.AddScoped<LoginUserService>();
builder.Services.AddScoped<Authorize>();

//builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new TimeSpanConverters());
            });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    c=>
{
    c.SchemaFilter<TimeSpanSchemaFilter>();
    c.SwaggerDoc("v1",new Microsoft.OpenApi.Models.OpenApiInfo { Title="Hospital Management WebApi",Version = "v1"});
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Please Inserto Token",
        Name = "Authorizationu",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"

                }
            },
            new string[] {}
        }
    });
}
    );

//add cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()); 
});
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", builder =>
//        builder.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader());
//});
//automap config
builder.Services.AddAutoMapper(typeof(MapperProfile));
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowOrigin");
app.MapControllers();
app.UseMiddleware<GlobalExceptionsMiddleware>();

app.Run();
