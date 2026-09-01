import { Injectable } from "@nestjs/common";
import { users } from "./users.schema";
import { GetUserDto } from "./_utils/dtos/responses/get-user.dto";
import { GetUserWithRole } from "./_utils/types/get-user-with-role.types";
import { GetUserWithRoleDto } from "./_utils/dtos/responses/get-user-with-role.dto";

@Injectable()
export class UserMapper {
  toGetUserDto = (user: typeof users.$inferSelect): GetUserDto => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId
  })

  toGetUserWithRoleDto = (user: GetUserWithRole): GetUserWithRoleDto => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  })

}