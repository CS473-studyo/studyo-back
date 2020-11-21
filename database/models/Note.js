module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      page: DataTypes.INTEGER,
      image: DataTypes.STRING,
      clap: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Note.associate = function (models) {
    // associations can be defined here
    Note.belongsTo(models.Lecture);
    Note.belongsTo(models.User);
  };
  return Note;
};
