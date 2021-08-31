/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dailies
// ====================================================

export interface Dailies_dailies_pageInfo {
  __typename: "PageInfo";
  /**
   * Indicates whether more edges exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
  /**
   * Indicates whether more edges exist prior the set defined by the clients arguments.
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface Dailies_dailies_edges {
  __typename: "DailyEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
}

export interface Dailies_dailies_nodes_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
}

export interface Dailies_dailies_nodes {
  __typename: "Daily";
  id: string;
  summary: string;
  dateCreated: any;
  user: Dailies_dailies_nodes_user;
}

export interface Dailies_dailies {
  __typename: "DailyConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: Dailies_dailies_pageInfo;
  /**
   * A list of edges.
   */
  edges: Dailies_dailies_edges[] | null;
  /**
   * A flattened list of the nodes.
   */
  nodes: Dailies_dailies_nodes[] | null;
}

export interface Dailies {
  dailies: Dailies_dailies | null;
}

export interface DailiesVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
