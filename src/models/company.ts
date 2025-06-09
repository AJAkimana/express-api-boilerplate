import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';

export class Company extends BaseModel<CFG.ICompany> implements CFG.ICompany {
  public name!: string;
  public email!: string;
  public phoneNumber!: string;
  public address!: string;
  public logoUrl?: string;
}

Company.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'companies',
    modelName: 'Company',
  },
);
