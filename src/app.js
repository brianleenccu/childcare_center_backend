require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./core/config/swagger");

const photoRoutes = require("./modules/photo/photo.routes");
const adminRoutes = require("./modules/adminLogin/admin.routes");
const parentRoutes = require("./modules/parentLogin/parent.routes");

const childcareCenterRoutes = require("./modules/childcare_center/childcare_center.routes");
const reviewRoutes = require("./modules/reviews/reviews.routes");

const staffRoutes = require("./modules/staff/staff.routes");

const governmentEvaluationRoutes = require("./modules/government_evaluation/government_evaluation.routes");

const enrollmentStatusRoutes = require("./modules/enrollment_status/enrollment_status.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Existing routes */

app.use("/api/photo", photoRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/parent", parentRoutes);

app.use("/api/childcare-centers", childcareCenterRoutes);
app.use("/api/reviews", reviewRoutes);

/* CRUD routes */

app.use("/api/staff", staffRoutes);

app.use("/api/government-evaluations", governmentEvaluationRoutes);

app.use("/api/enrollment-status", enrollmentStatusRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
