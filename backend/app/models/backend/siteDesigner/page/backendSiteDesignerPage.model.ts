import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPage",
})
export default class backendSiteDesignerPage extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  slug: string;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isReady: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isPublished: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isChanged: boolean;
  
  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isDraft: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: true,
  })
  isRecentlyCreated: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isRecentlyDeleted: boolean;
}
