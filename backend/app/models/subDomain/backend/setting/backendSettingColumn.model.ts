import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingColumn",
})
export default class backendSettingColumn extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.STRING,
  })
  width: string;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isChanged: boolean;
  
  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;
}
