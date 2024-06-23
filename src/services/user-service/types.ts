export type UserInformationType = {
  userId: string
  registeredAt: string
  displayName: string
  lastLoginAt: string
  name: string
  profileImageUrl: string
  email: string
  gender?: string
  age?: string
}

export type UserInformationQueryType = Partial<UserInformationType>

export type UserColumns = keyof UserInformationType
