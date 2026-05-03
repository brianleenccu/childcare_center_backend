# childcare_center_backend
## 技術架構

- **Runtime**：Node.js
- **框架**：Express.js
- **資料庫**：Supabase（PostgreSQL）
- **API 文件**：Swagger UI
- **架構模式**：業務模組化 MVC

```
src/
├── app.js
├── core/config/
│   ├── supabase.js
│   └── swagger.js
└── modules/<domain>/
    ├── <domain>.controller.js
    ├── <domain>.service.js
    ├── <domain>.model.js
    └── <domain>.routes.js
```

## 環境設定

```bash
cp .env.example .env
```

填入 `.env`：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3000
```

## 啟動

```bash
npm install
npm run dev
```

Swagger UI：`http://localhost:3000/api-docs`

## API 摘要

Base URL：`/api/childcare-centers`

| Method | 路徑 | 說明 |
|--------|------|------|
| GET | `/:id` | 查詢單筆托育中心 |
| POST | `/` | 新增托育中心 |
| PUT | `/:id` | 更新托育中心 |
| DELETE | `/:id` | 刪除托育中心 |
