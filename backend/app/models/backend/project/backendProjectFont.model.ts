import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectFont",
})
export default class backendProjectFont extends Model {

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
  font: string;


}
