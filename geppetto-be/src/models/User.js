import { DataTypes } from 'sequelize';
import { BaseModel, baseAttributes } from '#models/BaseModel';
import sequelize from '#config/db';

class User extends BaseModel {}

User.init({
  ...baseAttributes,
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  fullName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  hashedPassword: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'staff'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  timestamps: true
});

export default User;
