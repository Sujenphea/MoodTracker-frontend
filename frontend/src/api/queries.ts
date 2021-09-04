import { gql } from "@apollo/client";
import * as fragments from "./fragments";

// export const DAILIES = gql`
//   query Dailies($first: Int, $after: String, $last: Int, $before: String) {
//     dailies(first: $first, after: $after, last: $last, before: $before) {
//       pageInfo {
//         ...pageInfoFields
//       }
//       edges {
//         cursor
//       }
//       nodes {
//         ...dailyFields
//         user {
//           ...userFields
//         }
//       }
//     }
//   }
//   ${fragments.DAILY}
//   ${fragments.PAGE_INFO}
//   ${fragments.USER}
// `;

export const DAILIES = gql`
  query Dailies {
    dailies {
      nodes {
        summary
        dateCreated
        id
        user {
          id
          name
          gitHub
        }
      }
    }
  }
`;

export const DAILIESBYUSERID = gql`
  query DailiesByUserId($id: Int!) {
    dailiesByUserId(id: $id) {
      nodes {
        ...dailyFields
        user {
          ...userFields
        }
      }
    }
  }
  ${fragments.DAILY}
  ${fragments.USER}
`;

export const DAILY = gql`
  query Daily($id: Int!) {
    daily(id: $id) {
      ...dailyFields
    }
  }
  ${fragments.DAILY}
`;

export const USERS = gql`
  query Users($first: Int, $after: String, $last: Int, $before: String) {
    users(first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        ...pageInfoFields
      }
      edges {
        cursor
      }
      nodes {
        ...userFields
      }
    }
  }
  ${fragments.USER}
  ${fragments.PAGE_INFO}
`;

export const USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      ...userFields
    }
  }
  ${fragments.USER}
`;

export const SELF = gql`
  query Self {
    self {
      ...userFields
    }
  }
  ${fragments.USER}
`;
