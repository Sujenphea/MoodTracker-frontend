/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Daily
// ====================================================

export interface Daily_daily {
  __typename: "Daily";
  id: string;
  summary: string;
  created: any;
}

export interface Daily {
  daily: Daily_daily;
}

export interface DailyVariables {
  id: number;
}
