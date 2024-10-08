import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProjectPage from './backendProjectPage.model';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectPageLink",
})
export default class backendProjectPageLink extends Model {

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
  picture: string;

  @Column({
    type: sequelize.STRING,
  })
  pictureAlt: string;

  @ForeignKey(() => backendProjectPage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
