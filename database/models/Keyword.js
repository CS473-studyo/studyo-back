module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define(
    'Keyword',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      word: DataTypes.STRING,
      votes: {
        type: DataTypes.VIRTUAL,
        get: function () {
          return this.Users.length;
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Keyword.associate = function (models) {
    // associations can be defined here
    Keyword.belongsToMany(models.User, {
      through: 'User_Keyword',
      timestamps: false,
    }); // Users who voted for the keyword
    Keyword.belongsTo(models.User); // User who created keyword
    Keyword.belongsTo(models.Lecture);
  };
  return Keyword;
};
