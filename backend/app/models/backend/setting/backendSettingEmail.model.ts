import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingEmail",
})
export default class backendSettingEmail extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
  })
  emailVerificationSubject: string;

  @Column({
    type: sequelize.STRING,
  })
  emailVerificationMessage: string;

  @Column({
    type: sequelize.STRING,
  })
  passwordResetSubject: string;

  @Column({
    type: sequelize.STRING,
  })
  passwordResetMessage: string;

  //Approved user Password
  @Column({
    type: sequelize.STRING,
  })
  resetPasswordEmailSubject: string;

  @Column({
    type: sequelize.STRING,
  })
  resetPasswordEmailMessage: string;

  @Column({
    type: sequelize.STRING,
  })
  inviteUserSubject: string;

  @Column({
    type: sequelize.STRING,
  })
  inviteUserMessage: string;

}
