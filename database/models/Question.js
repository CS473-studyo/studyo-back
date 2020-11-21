module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.Lecture);
    Question.belongsTo(models.User);
  };
  return Question;
};
