import { gql } from '@/shared/api/gql'

export const LOGIN_MUTATION = gql(`
  mutation Login($input: UserLogin!) {
    authLogin(input: $input) {
      access_token
      token_type
      expires_in_access
      expires_in_refresh
    }
  }
`)

export const GET_CURRENT_USER = gql(`
  query GetCurrentUser {
    authMe {
      id
      email
      phone
    }
  }
`)
