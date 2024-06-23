import snakeCase from 'lodash.snakecase'
import { CommentColumns, CommentQueryType, CommentType } from './types'
import {
  insertData,
  returnSupabase,
  supabase,
  updateData,
  upsertData,
} from '../supabase'

export class CommentService {
  constructor() {}
  static TABLE_NAME = 'comment'

  static async InsertComment(request_data: CommentQueryType): Promise<any> {
    const result = await insertData(CommentService.TABLE_NAME, request_data)
    return result
  }

  static async GetComment(
    column?: CommentColumns,
    value?: string | number | any,
    type?: 'none' | 'join'
  ): Promise<CommentType[]> {
    let fetched = supabase
      .from(CommentService.TABLE_NAME)
      .select()
      .order('created_at', { ascending: false })

    if (column && value) {
      fetched = fetched.eq(snakeCase(column), value)
    }
    const { data, error } = await fetched.limit(1)
    return returnSupabase(data, error)
  }

  static async UpdateComment(
    primaryKeyName: CommentColumns,
    body: CommentQueryType
  ) {
    const result = await updateData(
      CommentService.TABLE_NAME,
      primaryKeyName,
      body
    )

    return result
  }

  static async UpsertComment(
    primaryKeyName: CommentColumns,
    body: CommentQueryType
  ) {
    const result = await upsertData(
      CommentService.TABLE_NAME,
      primaryKeyName,
      body
    )

    return result
  }
}
