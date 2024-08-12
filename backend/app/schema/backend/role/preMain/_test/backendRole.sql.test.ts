import makeBackendRoleSql from "../backendRole.sql";
import { makeDTestObj } from "../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendRoleManyPermissionMain from "../../main/backendRoleManyPermission.main";

jest.setTimeout(100000);

describe("test backendRole.sql.js", () => {
  let d: dependencies;
  let recordId: string;

  beforeAll(async () => {
    d = await makeDTestObj();
  }, 100000);

  test("getManyWithPagination: works with no data..", async () => {
    const roleSql = makeBackendRoleSql(d);
    const roles = await roleSql.getManyWithPagination({});
    expect(roles.data.rows.length).toBe(0);
  });

  test("getMany: works with no data.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const roles = await roleSql.getMany();
    expect(roles.data.length).toBe(5);
  });

  test("addOne: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const addOne = await roleSql.addOne({ name: "Cool Role!" });
    recordId = addOne.data.dataValues.id;
    expect(addOne.data.dataValues.name).toEqual("Cool Role!");
  });

  test("getOneById: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const getRole = await roleSql.getOneById({ id: recordId });
    expect(getRole.data.dataValues.name).toEqual("Cool Role!");
  });

  test("updateOne: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const updateRole = await roleSql.updateOne({
      id: recordId,
      name: "Cool Role Updated!",
    });
    expect(updateRole.data.dataValues.name).toEqual("Cool Role Updated!");
  });

  test("deleteOne: backendRoles can delete record.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const deletedRole = await roleSql.deleteOne({ id: recordId });
    expect(deletedRole.success).toBe(true);
  });

  test("addMany: backendRoles can add many records at once.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const addManyRoles = await roleSql.addMany([
      { name: "blah1" },
      { name: "blah2" },
      { name: "blah3" },
    ]);
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah1").length).toBe(1);
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah2").length).toBe(1);
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah3").length).toBe(1);
  });

  test("getManyWithPagination: works with data.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const roles = await roleSql.getManyWithPagination({});
    expect(roles.data.rows.length).toBe(3);
  });

  test("getMany: works with data.", async () => {
    const roleSql = makeBackendRoleSql(d);
    const roles = await roleSql.getMany();
    expect(roles.data.length).toBe(8);
  });

  test("getPermissionsByRoleId: default role 'media manager inbox only'", async () => {
    const roleSql = makeBackendRoleSql(d);
    const permissions = await roleSql.getPermissionsByRoleId({
      roleId: "3da19e9e-06c1-4b26-acfc-bb727337fb0a",
    });
    const expectedPermissionId = "f72294fb-c53e-4c6b-bcc4-c08aedd3695c";
    expect(permissions.data.length).toBe(1);
    const hasExpectedPermission = permissions.data.some(permission =>
      permission.dataValues.id === expectedPermissionId
    );
    expect(hasExpectedPermission).toBe(true);
  });

  test("getPermissionsByRoleId: default role 'Observer'", async () => {
    const roleSql = makeBackendRoleSql(d);
    const permissions = await roleSql.getPermissionsByRoleId({
      roleId: "26249eec-d26a-437d-869e-54f1e4c34ad8",
    });
    const expectedPermissions = [
      "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      "e3f48381-31d3-4463-9861-5420d761c6e9",
      "cba2838f-0ad4-4853-8c90-d96de96a74a3",
    ];
    expect(permissions.data.length).toBe(3);
    const hasAllExpectedPermissions = expectedPermissions.every(expectedPermissionId =>
      permissions.data.some(permission => permission.dataValues.id === expectedPermissionId)
    );
    expect(hasAllExpectedPermissions).toBe(true);
  });

  test("getPermissionsByRoleId: default role 'Content Creator'", async () => {
    const roleSql = makeBackendRoleSql(d);
    const permissions = await roleSql.getPermissionsByRoleId({
      roleId: "14307d09-28cb-443d-bbd5-0948a913d729",
    });
    const expectedPermissions = [
      "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      "e3f48381-31d3-4463-9861-5420d761c6e9",
      "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
    ];
    expect(permissions.data.length).toBe(7);
    const hasAllExpectedPermissions = expectedPermissions.every(expectedPermissionId =>
      permissions.data.some(permission => permission.dataValues.id === expectedPermissionId)
    );
    expect(hasAllExpectedPermissions).toBe(true);
  });

  test("getPermissionsByRoleId: default role 'Editor'", async () => {
    const roleSql = makeBackendRoleSql(d);
    const permissions = await roleSql.getPermissionsByRoleId({
      roleId: "4d2d4209-f2b6-42c8-9be8-1bdd71f96cfc",
    });
    const expectedPermissions = [
      "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      "e3f48381-31d3-4463-9861-5420d761c6e9",
      "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
      "290b547b-77db-4817-aff0-b3c81d77e8d8",
      "0d85f1d5-01dd-4c2c-9316-996af2982b82",
    ];
    expect(permissions.data.length).toBe(10);
    const hasAllExpectedPermissions = expectedPermissions.every(expectedPermissionId =>
      permissions.data.some(permission => permission.dataValues.id === expectedPermissionId)
    );
    expect(hasAllExpectedPermissions).toBe(true);
  });
});
