require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    console.log("⏳ Connecting to database...");
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: false });
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup error:", error);
    process.exit(1);
  }
})();
