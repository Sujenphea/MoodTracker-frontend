import React from "react";
import { Story, Meta } from "@storybook/react";
import { GridContainer, GridContainerProps } from "./GridContainer";

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
  <GridContainer {...args} />
);

export const DailyGridContainer = Template.bind({});

DailyGridContainer.args = {
  isDarkMode: true,
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
