import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectBackgroundColor",
})
export default class backendProjectBackgroundColor extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => backendProject)
  @Column({
    allowNull: false
  })
  projectId: string;


  /////////////////////////////////////////////////////////////////////////
  // color 1
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  backgroundColor_day: string;

  @Column({
    type: sequelize.STRING,
  })
  backgroundColor_night: string;


}
