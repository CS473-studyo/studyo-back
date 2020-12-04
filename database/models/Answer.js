module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      clap: DataTypes.INTEGER,
      content: DataTypes.STRING,
      isSelected: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.User);
  };
  return Answer;
};
