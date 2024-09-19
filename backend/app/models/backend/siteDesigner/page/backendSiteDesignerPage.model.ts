import sequelize from 'sequelize';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import backendSiteDesignerPageBrowser from './backendSiteDesignerPageBrowser.model';
import backendSiteDesignerPageLink from './backendSiteDesignerPageLink.model';
import backendSiteDesignerPageSectionLoud from './backendSiteDesignerPageSectionLoud.model';
import backendSiteDesignerPageSectionNormal from './backendSiteDesignerPageSectionNormal.model';

export enum PageStatusEnum {
  New = "NEW",
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

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
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isReady: boolean;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  slug: string;
  
  @Column({
    type: sequelize.ENUM("NEW", "DRAFT", "PUBLISHED"),
    defaultValue: "NEW",
  })
  status: PageStatusEnum;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isChanged: boolean;

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

  // Add hasMany association with backendSiteDesignerPageBrowser
  @HasMany(() => backendSiteDesignerPageBrowser, { foreignKey: 'pageId' })
  browsers: backendSiteDesignerPageBrowser[];
  
  // Add hasMany association with backendSiteDesignerPageBrowser
  @HasMany(() => backendSiteDesignerPageLink, { foreignKey: 'pageId' })
  links: backendSiteDesignerPageLink[];
  
  // Add hasMany association with backendSiteDesignerPageBrowser
  @HasMany(() => backendSiteDesignerPageSectionLoud, { foreignKey: 'pageId' })
  sectionLouds: backendSiteDesignerPageSectionLoud[];
  
  // Add hasMany association with backendSiteDesignerPageBrowser
  @HasMany(() => backendSiteDesignerPageSectionNormal, { foreignKey: 'pageId' })
  sectionNormals: backendSiteDesignerPageSectionNormal[];
  
}
