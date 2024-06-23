import camelCase from 'lodash.camelcase'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import snakeCase from 'lodash.snakecase'
import { isObject } from '../utils/typeCheck'
import { PostgrestError, createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
  ? process.env.REACT_APP_SUPABASE_URL
  : ''
const PUBLIC_ANON_KEY = process.env.REACT_APP_PUBLIC_ANON_KEY
  ? process.env.REACT_APP_PUBLIC_ANON_KEY
  : ''

export const sb = createClient(SUPABASE_URL, PUBLIC_ANON_KEY)

export const supabase = createServerClient(SUPABASE_URL, PUBLIC_ANON_KEY, {
  cookies: {},
})

export const responseAdapter = <T, V>(
  targetObject: T | any | object
): V | any => {
  if (Array.isArray(targetObject)) {
    return (targetObject as T[]).map((value) =>
      responseAdapter<T, V>(value)
    ) as any
  } else if (!isObject(targetObject)) {
    return targetObject
  }

  const transformed: any = {}
  const keys = Object.keys(targetObject)

  for (const key of keys) {
    const value = targetObject[key]
    const transformedKey = camelCase(key)

    if (Array.isArray(value)) {
      transformed[transformedKey] = value.map((v) => responseAdapter(v))
    } else if (isObject(value)) {
      transformed[transformedKey] = responseAdapter(value)
    } else {
      transformed[transformedKey] = value
    }
  }

  return transformed as V
}

/**
 * JSON 형식의 데이터를 camelCase -> snake_case 로 전환해주는 어댑터입니다.
 */
export const requestAdapter = <T, V>(
  targetObject: T | any | object
): V | any => {
  if (Array.isArray(targetObject)) {
    return (targetObject as T[]).map((value) =>
      requestAdapter<T, V>(value)
    ) as any
  } else if (!isObject(targetObject)) {
    return targetObject
  }

  const transformed: any = {}
  const keys = Object.keys(targetObject)

  for (const key of keys) {
    const value = targetObject[key]
    const transformedKey = snakeCase(key)

    if (Array.isArray(value)) {
      transformed[transformedKey] = value.map((v) => requestAdapter(v))
    } else if (isObject(value)) {
      transformed[transformedKey] = requestAdapter(value)
    } else {
      transformed[transformedKey] = value
    }
  }

  return transformed as V
}

export const returnSupabase = <T>(
  data: any[] | null,
  error: PostgrestError | null
): T => {
  if (data) {
    return responseAdapter(data)
  } else {
    return responseAdapter(error)
  }
}

export type ReturnType = {
  data: any[] | null
  status: number
}

export const insertData = async <T>(
  tableName: string,
  body: T
): Promise<ReturnType> => {
  const { data, error } = await supabase
    .from(tableName)
    .insert(requestAdapter(body))

  return returnSupabase(data, error)
}

export const updateData = async (
  tableName: string,
  primaryKeyName: string,
  body: any
) => {
  const snakeBody = requestAdapter(body)

  const { data, error } = await supabase
    .from(tableName)
    .update(snakeBody)
    .eq(snakeCase(primaryKeyName), body[primaryKeyName])

  return returnSupabase(data, error)
}

export const upsertData = async <T>(
  tableName: string,
  primaryKeyName: string,
  body: T
): Promise<ReturnType> => {
  const snakeBody = requestAdapter(body)

  const { data, error } = await supabase.from(tableName).upsert({
    ...snakeBody,
  })

  return returnSupabase(data, error)
}
