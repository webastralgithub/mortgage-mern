// server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const sequelize = require('./config/db');
app.use(express.json());

// const db = new Sequelize("mern_auth", "root", "redhat", {
//     host: "localhost",
//     dialect: 'mysql',
//       dialectOptions: {
//           charset: 'utf8mb4',
//       }, // Use the appropriate dialect for your database
//   });
  
//   // Test the database connection
//   db.authenticate()
//     .then(() => {
//       console.log("Database connection successful");
//     })
//     .catch((error) => {
//       console.error("Database connection failed:", error);
//     });

// Import and use your routes here
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const roleRoutes=require("./routes/role.routes");
sequelize.authenticate().then(() => {
  sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db...');
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/role", roleRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
