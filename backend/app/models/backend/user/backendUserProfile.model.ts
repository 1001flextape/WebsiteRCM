import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import backendUser from './backendUser.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendUserProfile",
})
export default class backendUserProfile extends Model {
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

  @BelongsTo(() => backendUser, { as: 'user' })
  user: backendUser;

  @Column({
    type: DataType.STRING,
  })
  displayName: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
  })
  callByType: string;

  @Column({
    type: DataType.STRING,
  })
  circleColor: string;

  @Column({
    type: DataType.STRING,
  })
  labelColor: string;
}
