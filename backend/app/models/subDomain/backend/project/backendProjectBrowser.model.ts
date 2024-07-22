import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectBrowser",
})
export default class backendProjectBrowser extends Model {

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
  favicon: string;

  @Column({
    type: sequelize.STRING,
  })
  tab: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;

}

