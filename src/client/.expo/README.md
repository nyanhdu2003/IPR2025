1. cd into qr-tracking-app
2. run "npm install"
3. run "npx expo start"
   Note: Please run ipconfig in your cmd to get the IPv4 address and change it in src\client\qr-tracking-app\ipv4.js to run this demo in your phone using the same wifi.

BE:

1. Set up database:

- download and install postgreSQL and pgAdmin 4
- set up database username and password
- create new database <database-name>
- in appsettings.json: edit connection string
  "ConnectionStrings": {
  "AppDbConnectionString": "Host=localhost;Port=5432;Database=<database-name>;Username=<your-username>;Password=<yourpassword>"
  },

2. config ipv4:

- open cmd, run ipconfig snf get ipv4 address
- edit launchSettings.json
  "applicationUrl": "http://<your-ip-v4>:7007/",
- edit VideoService.cs
  in line 114, edit: var relativePath = $"http://<your-ip-v4>:7007/Videos/{fileName}";

3. Run project

- Download .NET SDK
- Use file RunCommands.md to run the project: + Run below command to run one time and not automatically reload when there are changes:
  `bash
          dotnet run --project QRPackingApp.WebAPI
          ` + Run below command to run repeatedly and automatically reload when there are changes:
  `bash
          dotnet watch --project QRPackingApp.WebAPI
          `
