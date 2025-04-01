import { gql, TypedDocumentNode } from '@apollo/client'
import { Mutation, Query } from '@/shared/api/graphql'

export const LOGIN_MUTATION = gql(`
  mutation Login($input: UserLogin!) {
    authLogin(input: $input) {
      access_token
      token_type
      expires_in_access
      expires_in_refresh
    }
  }
`) as TypedDocumentNode<Pick<Mutation, 'authLogin'>, { input: any }>

export const GET_CURRENT_USER = gql(`
  query GetCurrentUser {
    authMe {
      id
      email
      phone
    }
  }
`) as TypedDocumentNode<Pick<Query, 'authMe'>, {}>

export const LOGOUT_MUTATION = gql(`
  mutation AuthLogout {
    authLogout
  }
`) as TypedDocumentNode<Pick<Mutation, 'authLogout'>, {}>

export const REFRESH_MUTATION = gql(`
  mutation AuthRefresh {
    authRefresh {
      access_token
      token_type
      expires_in_access
      expires_in_refresh
    }
  }
`) as TypedDocumentNode<Pick<Mutation, 'authRefresh'>, {}>
