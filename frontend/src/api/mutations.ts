import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const LOGIN = gql`
  mutation Login($code: String!) {
    login(input: { code: $code }) {
      user {
        ...userFields
      }
      jwt
    }
  }
  ${fragments.USER}
`;

export const EDIT_SELF = gql`
  mutation EditSelf($name: String) {
    editSelf(input: { name: $name }) {
      ...userFields
    }
  }
  ${fragments.USER}
`;

export const ADD_DAILY = gql`
  mutation AddDaily($summary: String!) {
    addDaily(input: { summary: $summary }) {
      ...dailyFields
    }
  }
  ${fragments.DAILY}
`;

export const EDIT_DAILY = gql`
  mutation EditDaily($id: Int!, $summary: String) {
    editDaily(input: { id: $id, summary: $summary }) {
      ...dailyFields
    }
  }
  ${fragments.DAILY}
`;
