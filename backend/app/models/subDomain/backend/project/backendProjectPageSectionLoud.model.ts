import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProjectPage from './backendProjectPage.model';
import { sameDocMenuType } from '../../../../schema/subDomain/collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script';
import { SelectionTypeEnum } from '../../backend/setting/backendSettingHeader.model';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectPageSectionLoud",
})
export default class backendProjectPageSectionLoud extends Model {

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
  
  @ForeignKey(() => backendProjectPage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
