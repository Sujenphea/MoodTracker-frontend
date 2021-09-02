/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditSelf
// ====================================================

export interface EditSelf_editSelf {
  __typename: "User";
  id: string;
  name: string;
  gitHub: string;
}

export interface EditSelf {
  editSelf: EditSelf_editSelf;
}

export interface EditSelfVariables {
  name?: string | null;
}
