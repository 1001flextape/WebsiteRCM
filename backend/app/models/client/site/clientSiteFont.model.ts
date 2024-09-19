import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "clientSiteFont",
})
export default class clientSiteFont extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
  })
  font: string;
}
