/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_pageInfo {
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

export interface Users_users_edges {
  __typename: "UserEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
}

export interface Users_users_nodes {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
}

export interface Users_users {
  __typename: "UserConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: Users_users_pageInfo;
  /**
   * A list of edges.
   */
  edges: Users_users_edges[] | null;
  /**
   * A flattened list of the nodes.
   */
  nodes: Users_users_nodes[] | null;
}

export interface Users {
  users: Users_users | null;
}

export interface UsersVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
