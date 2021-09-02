import React from "react";
import { Story, Meta } from "@storybook/react";
import { Home, HomeProps } from "./Home";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "UI Components/Home",
  component: Home,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const HomeSample = Template.bind({});
HomeSample.args = {
  isDarkMode: true,
};
