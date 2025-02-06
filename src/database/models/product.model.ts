import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './index';

class SequelizeProducts extends Model<
  InferAttributes<SequelizeProducts>,
  InferCreationAttributes<SequelizeProducts>
> {
  declare id: CreationOptional<number>;
  declare sku: string;
  declare name: string;
  declare price: number;
}

SequelizeProducts.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'products',
    timestamps: false,
    underscored: true,
  }
);

export default SequelizeProducts;
