import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import backendRole from '../role/backendRole.model';
import backendUser from './backendUser.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendUserManyRole",
})
export default class backendUserManyRole extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false
  })
  userId: string;

  @BelongsTo(() => backendUser)
  user: backendUser;

  @ForeignKey(() => backendRole)
  @Column({
    allowNull: false
  })
  roleId: string;

  @BelongsTo(() => backendRole)
  role: backendRole;
}
