/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditDaily
// ====================================================

export interface EditDaily_editDaily {
  __typename: "Daily";
  id: string;
  summary: string;
  created: any;
}

export interface EditDaily {
  editDaily: EditDaily_editDaily;
}

export interface EditDailyVariables {
  id: number;
  summary?: string | null;
}
