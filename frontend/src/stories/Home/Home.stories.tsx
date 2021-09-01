import React from "react";
import { Story, Meta } from "@storybook/react";
import { Home } from "./Home";
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

const Template: Story = () => <Home />;

export const HomeSample = Template.bind({});
