/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dailies
// ====================================================

export interface Dailies_dailies_nodes_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
}

export interface Dailies_dailies_nodes {
  __typename: "Daily";
  summary: string;
  dateCreated: string;
  id: string;
  user: Dailies_dailies_nodes_user;
}

export interface Dailies_dailies {
  __typename: "DailyConnection";
  /**
   * A flattened list of the nodes.
   */
  nodes: Dailies_dailies_nodes[] | null;
}

export interface Dailies {
  dailies: Dailies_dailies | null;
}
