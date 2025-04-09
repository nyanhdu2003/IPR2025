# Add package for QRPackingApp.Models
dotnet add QRPackingApp.Model package Microsoft.EntityFrameworkCore
dotnet add QRPackingApp.Model package Microsoft.AspNetCore.Identity.EntityFrameworkCore

# Add package for QRPackingApp.Business
dotnet add QRPackingApp.Business package Microsoft.EntityFrameworkCore
dotnet add QRPackingApp.Business package MediatR
dotnet add QRPackingApp.Business package AutoMapper
dotnet add QRPackingApp.Business package Newtonsoft.Json

# Add package for QRPackingApp.Data
dotnet add QRPackingApp.Data package Microsoft.EntityFrameworkCore
dotnet add QRPackingApp.Data package Microsoft.EntityFrameworkCore.SqlServer
dotnet add QRPackingApp.Data package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add QRPackingApp.Data package Microsoft.AspNetCore.Identity
dotnet add QRPackingApp.Data package Microsoft.EntityFrameworkCore.Design

# Add package for QRPackingApp.API
dotnet add QRPackingApp.WebAPI package Microsoft.EntityFrameworkCore
dotnet add QRPackingApp.WebAPI package Microsoft.EntityFrameworkCore.SqlServer
dotnet add QRPackingApp.WebAPI package Microsoft.EntityFrameworkCore.Design
dotnet add QRPackingApp.WebAPI package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add QRPackingApp.WebAPI package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add QRPackingApp.WebAPI package Microsoft.AspNetCore.Identity.UI
dotnet add QRPackingApp.WebAPI package Microsoft.AspNetCore.Mvc.Versioning
dotnet add QRPackingApp.WebAPI package Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer
dotnet add QRPackingApp.WebAPI package Microsoft.Extensions.Configuration
dotnet add QRPackingApp.WebAPI package Swashbuckle.AspNetCore
dotnet add QRPackingApp.WebAPI package Swashbuckle.AspNetCore.Swagger
dotnet add QRPackingApp.WebAPI package Swashbuckle.AspNetCore.SwaggerGen
dotnet add QRPackingApp.WebAPI package Swashbuckle.AspNetCore.SwaggerUI
dotnet add QRPackingApp.API package Serilog
dotnet add QRPackingApp.API package Serilog.AspNetCore
dotnet add QRPackingApp.API package Serilog.Sinks.Console
dotnet add QRPackingApp.API package Serilog.Sinks.File
dotnet add QRPackingApp.API package NUnit
dotnet add QRPackingApp.API package Moq
dotnet add QRPackingApp.API package Microsoft.EntityFrameworkCore.InMemory



