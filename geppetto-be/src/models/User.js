import { DataTypes } from 'sequelize';
import sequelize from '#config/db';
import { ROLES } from '#constants/role'
import { BaseModel, baseAttributes } from '#models/BaseModel';

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
    type: DataTypes.ENUM(ROLES.ADMIN, ROLES.STAFF),
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
