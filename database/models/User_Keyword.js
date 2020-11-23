module.exports = (sequelize, DataTypes) => {
  const User_Keyword = sequelize.define(
    'User_Keyword',
    {},
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  User_Keyword.associate = function (models) {
    // associations can be defined here
    User_Keyword.belongsTo(models.User);
    User_Keyword.belongsTo(models.Keyword);
  };
  return User_Keyword;
};
