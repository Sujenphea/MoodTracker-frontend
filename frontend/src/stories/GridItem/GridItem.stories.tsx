import React from "react";
import { Story, Meta } from "@storybook/react";
import { GridItem, GridItemProps } from "./GridItem";
import { ApolloProvider } from "@apollo/client";
import graphQLClient from "../../GraphQLClient";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

export default {
  title: "UI Components/GridItem",
  component: GridItem,
} as Meta;

const Template: Story<GridItemProps> = (args) => (
  <Provider store={store}>
    <ApolloProvider client={graphQLClient}>
      <GridItem {...args} />
    </ApolloProvider>
  </Provider>
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
