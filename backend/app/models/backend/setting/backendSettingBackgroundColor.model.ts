import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingBackgroundColor",
})
export default class backendSettingBackgroundColor extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.STRING,
  })
  backgroundColor_day: string;

  @Column({
    type: sequelize.STRING,
  })
  backgroundColor_night: string;

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
