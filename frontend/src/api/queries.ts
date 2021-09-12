import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const DAILIES = gql`
  query Dailies {
    dailies {
      ...dailyFields
      user {
        ...userFields
      }
    }
  }
  ${fragments.DAILY}
  ${fragments.USER}
`;

export const DAILIESBYUSERID = gql`
  query DailiesByUserId($id: String!) {
    dailiesByUserId(id: $id) {
      ...dailyFields
      user {
        ...userFields
      }
    }
  }
  ${fragments.DAILY}
  ${fragments.USER}
`;

// export const DAILY = gql`
//   query Daily($id: Int!) {
//     daily(id: $id) {
//       ...dailyFields
//     }
//   }
//   ${fragments.DAILY}
// `;

export const USERS = gql`
  query Users {
    users {
      ...userFields
    }
  }
  ${fragments.USER}
`;

// export const USER = gql`
//   query User($id: String!) {
//     user(id: $id) {
//       ...userFields
//     }
//   }
//   ${fragments.USER}
// `;

export const SELF = gql`
  query Self {
    self {
      ...userFields
    }
  }
  ${fragments.USER}
`;
