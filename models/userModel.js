module.exports = (Sequelize, sequelize, DataTyes) => {
  return sequelize.define(
    "users",
    {
      ...require("./cors")(Sequelize, DataTyes),
      name: {
        type: DataTyes.STRING(255),
        allowNull: true,
        defaultValue:null,
      },

      email: {
        type: DataTyes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },

      gender: {
        type: DataTyes.STRING(255),
        allowNull: true,
        defaultValue:null,
      },

      age: {
        type: DataTyes.INTEGER,
        allowNull: true,
        defaultValue:null,
      },
    },
    {
      tableName: "users",
    }
  );
};
