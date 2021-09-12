/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DailiesByUserId
// ====================================================

export interface DailiesByUserId_dailiesByUserId_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface DailiesByUserId_dailiesByUserId {
  __typename: "Daily";
  id: string;
  description: string;
  dateCreated: string;
  user: DailiesByUserId_dailiesByUserId_user;
}

export interface DailiesByUserId {
  dailiesByUserId: (DailiesByUserId_dailiesByUserId | null)[] | null;
}

export interface DailiesByUserIdVariables {
  id: string;
}
