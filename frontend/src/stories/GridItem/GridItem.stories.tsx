import React from "react";
import { Story, Meta } from "@storybook/react";
import { GridItem, GridItemProps } from "./GridItem";
import { ApolloProvider, useMutation } from "@apollo/client";
import graphQLClient from "../../GraphQLClient";
import { EDIT_DAILY } from "../../api/mutations";
import { EditDaily } from "../../api/__generated__/EditDaily";

export default {
  title: "UI Components/GridItem",
  component: GridItem,
} as Meta;

const Template: Story<GridItemProps> = (args) => (
  <ApolloProvider client={graphQLClient}>
    <GridItem {...args} />
  </ApolloProvider>
);

export const DailyGridItem = Template.bind({});

DailyGridItem.args = {
  id: 1,
  summary: "hey hey",
  dateCreated: "30.07.2020",
  isToday: false,
};

export const TodayGridItem = Template.bind({});

TodayGridItem.args = {
  isToday: true,
  isEditing: true,
};
