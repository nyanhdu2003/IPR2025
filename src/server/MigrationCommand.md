# Migrations là một công cụ giúp quản lý các thay đổi trong cấu trúc cơ sở dữ liệu (Database Schema) theo sự thay đổi của mô hình dữ liệu (Model) trong ứng dụng. Nó giúp đồng bộ hóa giữa code-first models và database schema một cách dễ dàng.

## 1. Using the CLI

### Add a migration
```bash
dotnet ef migrations add UpdateModeGuiID --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context QRPackingAppDbContext --output-dir Migrations
dotnet ef migrations add [MigrationName] --project QRPackingApp.Data --startup-project QRPackingApp.API --context StorageDbContext --output-dir Migrations/Storage
```

### Update the database
```bash
dotnet ef database update --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context QRPackingAppDbContext
dotnet ef database update --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context StorageDbContext
```

### Roll Back a migration
```bash
dotnet ef database update AddStatusInvoice --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context QRPackingAppDbContext
```

### Drop the database
```bash
dotnet ef database drop --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context QRPackingAppDbContext
dotnet ef database drop --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context StorageDbContext
```

### Remove a migration
```bash
dotnet ef migrations remove --project QRPackingApp.Data --startup-project QRPackingApp.WebAPI --context QRPackingAppDbContext
dotnet ef migrations remove --project QRPackingApp.Data --startup-project QRPackingApp.API --context StorageDbContext
```

## 2. Using the Package Manager Console
### Add a migration
```bash
Add-Migration [MigrationName] -Project QRPackingApp.Data -StartupProject QRPackingApp.WebAPI -Context QRPackingAppDbContext -OutputDir QRPackingApp.Data/Migrations
```

### Update the database
```bash
Update-Database -Project QRPackingApp.Data -StartupProject QRPackingApp.WebAPI -Context QRPackingAppDbContext
```

### Roll back a migration
```bash
dotnet ef database update [MigrationName] --project QuizApp.Data --startup-project QuizApp.WebAPI --context QuizAppDbContext
```

### Remove a migration
```bash
Remove-Migration -Project QRPackingApp.Data -StartupProject QRPackingApp.WebAPI -Context QRPackingAppDbContext
```

[]: # Path: README.md
