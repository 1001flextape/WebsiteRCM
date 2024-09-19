import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { sameDocMenuType } from '../../../../schema/collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script';
import backendSiteDesignerPage from './backendSiteDesignerPage.model';
import { SelectionTypeEnum } from '../../setting/backendSettingHeader.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPageSectionLoud",
})
export default class backendSiteDesignerPageSectionLoud extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // GUI
  @Column({
    type: sequelize.STRING,
  })
  name: string;

  @Column({
    type: sequelize.STRING,
  })
  author: string;
  
  @Column({
    type: sequelize.STRING,
  })
  webAssetImport: string;

  @Column({
    type: sequelize.JSONB,
  })
  menuJsonB: sameDocMenuType;

  @Column({
    type: sequelize.JSONB,
  })
  userAnswersJsonB: any;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;

  @Column({
    type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
  })
  selectionType: SelectionTypeEnum;
  
  @Column({
    type: sequelize.UUID
  })
  selectionId: string;
  
  @ForeignKey(() => backendSiteDesignerPage)
  @Column({
    allowNull: false
  })
  pageId: string;
  
  // Add belongsTo association with backendSiteDesignerPage
  @BelongsTo(() => backendSiteDesignerPage, { foreignKey: 'pageId' })
  page: backendSiteDesignerPage;
}
