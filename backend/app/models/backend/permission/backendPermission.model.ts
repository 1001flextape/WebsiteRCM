import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import backendUserManyPermission from '../user/backendUserManyPermission.model';
import backendRoleManyPermission from '../role/backendRoleManyPermission.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendPermission",
})
export default class backendPermission extends Model {
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

  @HasMany(() => backendUserManyPermission)
  userPermissions: backendUserManyPermission[];

  @HasMany(() => backendRoleManyPermission)
  rolePermissions: backendRoleManyPermission[];
}
