import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';
import backendProjectPage from './backendProjectPage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectPageBrowser",
})
export default class backendProjectPageBrowser extends Model {

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
    allowNull: false,
  })
  tabName: string;

  @ForeignKey(() => backendProjectPage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
