import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectPage",
})
export default class backendProjectPage extends Model {

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
  slug: string;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isPublished: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isDraft: boolean;
  
  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isNew: boolean;
  
  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isChanged: boolean;
  
  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isDeleted: boolean;
  
}
