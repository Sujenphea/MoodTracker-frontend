/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dailies
// ====================================================

export interface Dailies_dailies_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface Dailies_dailies {
  __typename: "Daily";
  id: string;
  description: string;
  dateCreated: string;
  user: Dailies_dailies_user;
}

export interface Dailies {
  dailies: (Dailies_dailies | null)[] | null;
}
