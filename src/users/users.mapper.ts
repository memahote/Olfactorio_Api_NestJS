import { Injectable } from "@nestjs/common";
import { users } from "./users.schema";
import { GetUserDto } from "./_utils/dtos/responses/get-user.dto";

@Injectable()
export class UserMapper {
  toGetUserDto = (user: typeof users.$inferSelect): GetUserDto => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId
  })
}