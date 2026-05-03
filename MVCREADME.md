# MVC 架構說明

本專案採用 **MVC 分層架構**，將程式碼依照職責分層，每個檔案只做一件事。

## 專案結構

```
src/
├── app.js                       # 程式進入點，啟動伺服器、註冊所有路由
├── core/config/
│   ├── supabase.js              # Supabase 客戶端初始化設定
│   └── swagger.js               # Swagger API 文件設定
└── modules/<domain>/            # 每個業務模組自成一組（例如 childcare_center）
    ├── <domain>.controller.js   # 處理 HTTP 層：讀 req、呼叫 service、寫 res
    ├── <domain>.service.js      # 商業邏輯：驗證、錯誤處理等
    ├── <domain>.model.js        # 資料庫層：所有 Supabase 查詢
    └── <domain>.routes.js       # 路由定義：HTTP 方法 + 路徑 → controller
```

## HTTP 請求流程

```
Client 發 HTTP 請求
    ↓
app.js          → 入口，決定哪條路由接收請求
    ↓
routes.js       → 決定呼叫哪個 controller 函式
    ↓
controller.js   → 讀取 req、決定回傳什麼 res
    ↓
service.js      → 執行商業邏輯（例如：找不到就丟 404 錯誤）
    ↓
model.js        → 實際對 Supabase（資料庫）下查詢
    ↓
回傳結果，一路往上傳回給 Client
```

## 各層職責

| 檔案 | 職責 |
|------|------|
| `app.js` | 程式進入點，註冊路由、啟動伺服器 |
| `routes.js` | 將 HTTP 方法 + 路徑綁定到對應的 controller 函式 |
| `controller.js` | 讀取 `req`、呼叫 service、寫入 `res`，不含商業邏輯 |
| `service.js` | 執行商業邏輯，例如更新前先確認資料存在、找不到則拋 404 |
| `model.js` | 唯一與 Supabase 溝通的層，只負責資料庫查詢 |

## 分層的好處

| 好處 | 說明 |
|------|------|
| **好維護** | 改資料庫查詢只動 model，改錯誤回應只動 controller |
| **好測試** | 每層可以獨立 mock 測試 |
| **好擴充** | 新增業務模組只需複製相同結構的一組檔案 |
