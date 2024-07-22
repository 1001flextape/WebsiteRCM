import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectLink",
})
export default class backendProjectLink extends Model {

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

  @Column({
    type: sequelize.STRING,
  })
  title: string;

  @Column({
    type: sequelize.STRING,
  })
  description: string;

  @Column({
    type: sequelize.STRING,
  })
  image: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;
}
