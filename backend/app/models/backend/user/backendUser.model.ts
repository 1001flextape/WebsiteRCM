import { Table, Column, Model, DataType, HasMany, HasOne } from 'sequelize-typescript';
import backendUserProfile from './backendUserProfile.model';
import backendUserManyRole from './backendUserManyRole.model';
import backendUserManyPermission from './backendUserManyPermission.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendUser",
})
export default class backendUser extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  temporaryPassword: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isDeactivated: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  isAdmin: boolean;

  @HasOne(() => backendUserProfile, { as: 'profile' })
  userProfile: backendUserProfile;

  @HasMany(() => backendUserManyRole, { as: 'userRoles' })
  userRoles: backendUserManyRole[];

  @HasMany(() => backendUserManyPermission, { as: 'userPermissions' })
  userPermissions: backendUserManyPermission[];
}
