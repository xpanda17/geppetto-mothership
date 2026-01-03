import { Model, DataTypes } from 'sequelize';
import { DateTime } from 'luxon';

export class BaseModel extends Model {}

export const baseAttributes = {
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      // Converts the DB date into a Luxon object
      const rawValue = this.getDataValue('createdAt');
      return rawValue ? DateTime.fromJSDate(rawValue) : null;
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      const rawValue = this.getDataValue('updatedAt');
      return rawValue ? DateTime.fromJSDate(rawValue) : null;
    }
  }
};
