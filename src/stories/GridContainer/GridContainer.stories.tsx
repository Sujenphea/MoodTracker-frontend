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
  dailies: undefined,
  refetchData: () => {},
};
