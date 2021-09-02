import React from "react";
import { Story, Meta } from "@storybook/react";
import { GridContainer, GridContainerProps } from "./GridContainer";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default {
  title: "UI Components/GridContainer",
  component: GridContainer,
  // decorators: [
  //   (Story) => (
  //     <MemoryRouter>
  //       <Story />
  //     </MemoryRouter>
  //   ),
  // ],
} as Meta;

const Template: Story<GridContainerProps> = (args) => (
  <Provider store={store}>
    <GridContainer {...args} />
  </Provider>
);

export const DailyGridContainer = Template.bind({});

DailyGridContainer.args = {
  data: {
    dailies: {
      __typename: "DailyConnection",
      nodes: [
        {
          __typename: "Daily",
          summary: "hey world",
          dateCreated: "02.09.2021",
          id: "3",
          user: {
            __typename: "User",
            id: "1",
            name: "john",
            gitHub: "johnhu",
          },
        },
        {
          __typename: "Daily",
          summary: "hey",
          dateCreated: "31.08.2021",
          id: "2",
          user: {
            __typename: "User",
            id: "1",
            name: "john",
            gitHub: "johnhu",
          },
        },
      ],
    },
  },
};
