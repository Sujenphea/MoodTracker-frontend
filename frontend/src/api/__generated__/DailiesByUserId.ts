/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DailiesByUserId
// ====================================================

export interface DailiesByUserId_dailiesByUserId_nodes_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
}

export interface DailiesByUserId_dailiesByUserId_nodes {
  __typename: "Daily";
  summary: string;
  dateCreated: string;
  id: string;
  user: DailiesByUserId_dailiesByUserId_nodes_user;
}

export interface DailiesByUserId_dailiesByUserId {
  __typename: "DailyConnection";
  /**
   * A flattened list of the nodes.
   */
  nodes: DailiesByUserId_dailiesByUserId_nodes[] | null;
}

export interface DailiesByUserId {
  dailiesByUserId: DailiesByUserId_dailiesByUserId | null;
}

export interface DailiesByUserIdVariables {
  id: number;
}
