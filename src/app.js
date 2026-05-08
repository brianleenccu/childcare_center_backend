require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./core/config/swagger");
const childcareCenterRoutes = require("./modules/childcare_center/childcare_center.routes");
const photoRoutes = require("./modules/photo/photo.routes");
const adminRoutes = require("./modules/adminLogin/admin.routes");
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/childcare-centers", childcareCenterRoutes);
// test html
app.use(express.static("public"));
app.use("/api/photo", photoRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
