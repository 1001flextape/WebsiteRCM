import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendProject from './backendProject.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendProjectOrganization",
})
export default class backendProjectOrganization extends Model {

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
  logo: string;

  @Column({
    type: sequelize.STRING,
  })
  name: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  shouldApplyToTopNavMenu: boolean;

  @Column({
    type: sequelize.STRING,
  })
  addressLine1: string;

  @Column({
    type: sequelize.STRING,
  })
  addressLine2: string;

  @Column({
    type: sequelize.STRING,
  })
  cityLocality: string;

  @Column({
    type: sequelize.STRING,
  })
  stateProvinceRegion: string;

  @Column({
    type: sequelize.STRING,
  })
  postalCode: string;

  @Column({
    type: sequelize.STRING,
  })
  socialFacebook: string;

  @Column({
    type: sequelize.STRING,
  })
  socialX: string;

  @Column({
    type: sequelize.STRING,
  })
  socialInstagram: string;

  @Column({
    type: sequelize.STRING,
  })
  socialLinkedIn: string;

  @Column({
    type: sequelize.STRING,
  })
  socialYouTube: string;

  @Column({
    type: sequelize.STRING,
  })
  socialPinterest: string;

  @Column({
    type: sequelize.STRING,
  })
  socialWhatsapp: string;

  @Column({
    type: sequelize.STRING,
  })
  socialReddit: string;

}
