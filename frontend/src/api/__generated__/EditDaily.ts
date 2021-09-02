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
  dateCreated: string;
}

export interface EditDaily {
  editDaily: EditDaily_editDaily;
}

export interface EditDailyVariables {
  id: number;
  summary?: string | null;
}
