import snakeCase from "lodash.snakecase";
import {
  UserColumns,
  UserInformationQueryType,
  UserInformationType,
} from "./types";
import {
  insertData,
  returnSupabase,
  supabase,
  updateData,
  upsertData,
} from "../supabase";

export class UserService {
  constructor() {}
  static TABLE_NAME = "user";

  static async InsertUser(request_data: UserInformationType): Promise<any> {
    const result = await insertData(UserService.TABLE_NAME, request_data);
    return result;
  }

  static async GetUser(
    column?: UserColumns,
    value?: string | number | any,
  ): Promise<UserInformationType[]> {
    let fetched = supabase
      .from(UserService.TABLE_NAME)
      .select()
      .order("registered_at", { ascending: false });

    if (column && value) {
      fetched = fetched.eq(snakeCase(column), value);
    }
    const { data, error } = await fetched.limit(1);
    return returnSupabase(data, error);
  }

  static async UpdateUser(
    primaryKeyName: UserColumns,
    body: UserInformationQueryType,
  ) {
    const result = await updateData(
      UserService.TABLE_NAME,
      primaryKeyName,
      body,
    );

    return result;
  }

  static async UpsertUser(
    primaryKeyName: UserColumns,
    body: UserInformationQueryType,
  ) {
    const result = await upsertData(
      UserService.TABLE_NAME,
      primaryKeyName,
      body,
    );

    return result;
  }
}
