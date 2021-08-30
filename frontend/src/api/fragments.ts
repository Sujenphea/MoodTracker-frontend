import { gql } from "@apollo/client";

export const USER = gql`
  fragment userFields on User {
    id
    name
    gitHub
  }
`;

export const DAILY = gql`
  fragment dailyFields on Daily {
    id
    summary
    created
  }
`;

export const PAGE_INFO = gql`
  fragment pageInfoFields on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
