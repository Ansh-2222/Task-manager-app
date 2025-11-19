module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      defaultValue: "pending"
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
