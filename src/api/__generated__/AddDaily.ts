/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDaily
// ====================================================

export interface AddDaily_addDaily {
  __typename: "Daily";
  id: string;
  description: string;
  dateCreated: string;
}

export interface AddDaily {
  addDaily: AddDaily_addDaily | null;
}

export interface AddDailyVariables {
  description: string;
}
