/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
  imageURI: string;
}

export interface Login_login {
  __typename: "LoginPayload";
  user: Login_login_user | null;
  jwt: string | null;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  code: string;
}
