// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
// import foundationUser from '../../../domain/foundation/user/foundationUser.model';
// import foundationUserProfile from '../../../domain/foundation/user/foundationUserProfile.model';

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
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isDeactivated: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  isAdmin: boolean;

  // @ForeignKey(() => foundationUser)
  // @Column
  // foundationUserId: string;


  // @ForeignKey(() => foundationUserProfile)
  // @Column
  // foundationUserProfileId: string;
}
