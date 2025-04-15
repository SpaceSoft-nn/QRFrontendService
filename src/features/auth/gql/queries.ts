import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql(`
  mutation login($input: UserLogin!) {
    login(input: $input) {
      access_token
    }
  }
`)

export const REGISTER_MUTATION = gql(`
  mutation register($input: UserRegistration!) {
    registration(input: $input) {
      access_token
    }
  }
`)

export const USERINFO_FRAGMENT = gql(`
  fragment UserInfo on User {
    id
    first_name
    last_name
    father_name
    role
    permission
    active
    auth
    email
    phone
    created_at
    updated_at
  }
`)

export const ORGANIZATION_FRAGMENT = gql(`
  fragment OrganizationInfo on Organization {
    id
    name
    address
    type
    okved
    founded_date
    inn
    kpp
    registration_number
    owner {
      first_name
      last_name
      father_name
      email
      phone
    }
    users {
      id
      first_name
      last_name
      father_name
    }
    created_at
    updated_at
  }
`)

export const SUBSCRIPTION_FRAGMENT = gql(`
  fragment SubscriptionInfo on SubscriptionPlan {
    plan_name
    price
    expires_at
    created_at
  }
`)

export const PERSONAL_AREA_FRAGMENT = gql(`
  fragment PersonalAreaInfo on PersonalArea {
    id
    owner {
      id
      first_name
      last_name
      father_name
    }
    balance
    subscription {
      ...SubscriptionInfo
    }
    created_at
  }
`)

export const GET_CURRENT_USER = gql(`
  fragment UserFragment on User {
  first_name
  last_name
  father_name
  role
  organizations {
    id
    name
    address
    type
    okved
    founded_date
    inn
    kpp
  }
  active
  email
  phone
  created_at
  }

  query GetMe {
    authMe {
      ...UserFragment
   }
  }
`)

export const LOGOUT_MUTATION = gql(`
  mutation AuthLogout {
    authLogout
  }
`)

export const REFRESH_MUTATION = gql(`
  mutation AuthRefreshToken {
    authRefresh {
      access_token
    }
  }
`)
