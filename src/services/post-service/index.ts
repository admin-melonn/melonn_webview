import snakeCase from 'lodash.snakecase'
import { PostColumns, PostDisplayType, PostQueryType, PostType } from './types'
import {
  insertData,
  returnSupabase,
  supabase,
  updateData,
  upsertData,
} from '../supabase'

export class PostService {
  constructor() {}
  static TABLE_NAME = 'post'

  static async InsertPost(request_data: PostQueryType): Promise<any> {
    const result = await insertData(PostService.TABLE_NAME, request_data)
    return result
  }

  static async GetPosts(
    column?: PostColumns,
    value?: string | number | any
  ): Promise<PostDisplayType[]> {
    const { data, error } = await supabase
      .from(PostService.TABLE_NAME)
      .select(
        `
          post_id,
          created_at,
          content,
          image_url,
          likes_count,
          user_id,
          user (user_id, name, profile_image_url),
          comments:comment (post_id, comment_id, created_at, content, likes_count, parent_comment_id, user_id, user (user_id, name, profile_image_url))
          `
      )
      .order('created_at', { ascending: false })
      .eq(snakeCase(column), value)
      .filter('comments.parent_comment_id', 'is', null)
      .limit(10)

    return returnSupabase(data, error)
  }

  static async GetPost(
    column?: PostColumns,
    value?: string | number | any
  ): Promise<PostDisplayType[]> {
    const { data, error } = await supabase
      .from(PostService.TABLE_NAME)
      .select(
        `
          post_id,
          created_at,
          content,
          image_url,
          likes_count,
          user_id,
          user (user_id, name, profile_image_url),
          comments:comment (post_id, comment_id, created_at, content, likes_count, user_id, parent_comment_id, user (user_id, name, profile_image_url))
          `
      )
      .order('created_at', { ascending: false })
      .eq(snakeCase(column), value)

    return returnSupabase(data, error)
  }

  static async UpdatePost(primaryKeyName: PostColumns, body: PostQueryType) {
    const result = await updateData(
      PostService.TABLE_NAME,
      primaryKeyName,
      body
    )

    return result
  }

  static async UpsertPost(primaryKeyName: PostColumns, body: PostQueryType) {
    const result = await upsertData(
      PostService.TABLE_NAME,
      primaryKeyName,
      body
    )

    return result
  }
}
