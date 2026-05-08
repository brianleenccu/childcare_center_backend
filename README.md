# childcare_center_backend
## 技術架構

- **Runtime**：Node.js
- **框架**：Express.js
- **資料庫**：Supabase（PostgreSQL）
- **API 文件**：Swagger UI
- **架構模式**：[業務模組化 MVC](MVCREADME.md)

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

## 套件安裝

```bash
npm install
```

| 套件 | 類型 | 用途 |
|------|------|------|
| `express` | 正式 | Web 框架 |
| `@supabase/supabase-js` | 正式 | Supabase 資料庫客戶端 |
| `dotenv` | 正式 | 讀取 `.env` 環境變數 |
| `swagger-jsdoc` | 正式 | 從 JSDoc 註解產生 Swagger 規格 |
| `swagger-ui-express` | 正式 | 提供 Swagger UI 文件頁面 |
| `nodemon` | 開發 | 程式碼變更時自動重啟伺服器 |

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
