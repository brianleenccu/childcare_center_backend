# childcare_center_backend

## 技術架構

- **Runtime**：Node.js
- **框架**：Express.js
- **資料庫**：Supabase（PostgreSQL，透過 `pg` 直連）
- **API 文件**：Swagger UI
- **架構模式**：業務模組化 MVC

```
src/
├── app.js
├── core/
│   └── config/
│       ├── db.js        # pg Pool 連線設定
│       └── swagger.js
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
| `pg` | 正式 | PostgreSQL 直連（raw SQL） |
| `dotenv` | 正式 | 讀取 `.env` 環境變數 |
| `swagger-jsdoc` | 正式 | 從 JSDoc 註解產生 Swagger 規格 |
| `swagger-ui-express` | 正式 | 提供 Swagger UI 文件頁面 |
| `nodemon` | 開發 | 程式碼變更時自動重啟伺服器 |

## 環境設定

建立 `.env` 檔：

```
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
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
| GET | `/` | 查詢所有托育中心 |
| GET | `/:id` | 查詢單筆托育中心 |
| POST | `/` | 新增托育中心 |
| PUT | `/:id` | 更新托育中心 |
| DELETE | `/:id` | 刪除托育中心 |
| GET | `/search/capacity?range=` | 依總收托人數篩選（`1-15` / `16-30` / `31-45` / `46-60`） |
| GET | `/search/operation-type?type=` | 依經營類型篩選（`公立` / `私立`） |
| GET | `/search/category?category=` | 依類別篩選（`托嬰中心` / `幼兒園` / `托兒所`） |
| GET | `/search/district?district=` | 依台北市行政區篩選（12 行政區） |
| GET | `/search/ratio?ratio=` | 依師生比篩選（`1:1` ～ `1:5`，回傳比例 ≥ 選擇值的中心） |
| GET | `/search/time?open_time=&close_time=` | 依營業時段篩選，格式 `HH:MM`，範圍 `06:00`～`22:00` |

## Reviews API

Base URL：`/api/reviews`

| Method | 路徑 | 說明 |
|--------|------|------|
| POST | `/` | 新增評論 |
| GET | `/:id` | 查詢單筆評論 |
| PUT | `/:id` | 更新評論 |
| DELETE | `/:id` | 刪除評論 |

### 欄位說明

| 欄位 | 類型 | 說明 |
|------|------|------|
| `review_id` | integer | 主鍵，自動產生 |
| `parent_id` | integer | 家長 ID |
| `center_id` | integer | 托育中心 ID |
| `score_overall` | float | 自動計算（staff + environment + curriculum 平均，取小數點後一位） |
| `score_staff` | integer | 師資評分 |
| `score_environment` | integer | 環境評分 |
| `score_curriculum` | integer | 課程評分 |
| `comment` | string | 文字評論 |
| `created_at` | timestamp | 建立時間，由前端傳入 |

> `score_overall` 不可由使用者自行傳入，系統會在新增或更新時自動計算。
