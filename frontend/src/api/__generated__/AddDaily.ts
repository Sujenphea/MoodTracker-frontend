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
  summary: string;
  created: any;
}

export interface AddDaily {
  addDaily: AddDaily_addDaily;
}

export interface AddDailyVariables {
  summary: string;
}
