import { DataTypes } from 'sequelize';
import sequelize from '#config/db';
import { BaseModel, baseAttributes } from '#models/BaseModel';

class Product extends BaseModel {}

Product.init({
  ...baseAttributes,
  // Mapping 'id' from the JSON (36759) as the primary key
  // If you prefer to use your own UUIDs, you can rename this to 'accurateId'
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  accurateProductId: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  productNumber: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  itemType: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sellingPrice: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  basePrice: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  underscored: true,
  timestamps: true
});

export default Product;
