import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import backendUserManyRole from '../user/backendUserManyRole.model';
import backendRoleManyPermission from './backendRoleManyPermission.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendRole",
})
export default class backendRole extends Model {
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
  name: string;

  @HasMany(() => backendUserManyRole)
  userRoles: backendUserManyRole[];

  @HasMany(() => backendRoleManyPermission)
  rolePermissions: backendRoleManyPermission[];
}
