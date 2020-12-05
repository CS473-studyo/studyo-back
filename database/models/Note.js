module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      pdf: DataTypes.STRING,
      clap: DataTypes.INTEGER,
      page: DataTypes.INTEGER,
      text: DataTypes.TEXT,
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
    // Note.belongsToMany(models.User, {
    //   through: 'Admin_Note',
    //   timestamps: false,
    // });
  };
  return Note;
};
