import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import backendSiteDesignerPage from './backendSiteDesignerPage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPageBrowser",
})
export default class backendSiteDesignerPageBrowser extends Model {
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
  tabName: string;

  @ForeignKey(() => backendSiteDesignerPage)
  @Column({
    allowNull: false
  })
  pageId: string;

  // Add belongsTo association with backendSiteDesignerPage
  @BelongsTo(() => backendSiteDesignerPage, { foreignKey: 'pageId' })
  page: backendSiteDesignerPage;
}
