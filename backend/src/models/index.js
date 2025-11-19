const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./user.model")(sequelize, Sequelize.DataTypes);
db.Task = require("./task.model")(sequelize, Sequelize.DataTypes);

// ⭐ Relations
db.User.hasMany(db.Task, { foreignKey: "userId" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
