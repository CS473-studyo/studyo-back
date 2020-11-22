module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    'Lecture',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      number: DataTypes.INTEGER,
      pdf: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Lecture.associate = function (models) {
    // associations can be defined here
    Lecture.belongsTo(models.Course);
    Lecture.hasMany(models.Keyword);
  };
  return Lecture;
};
