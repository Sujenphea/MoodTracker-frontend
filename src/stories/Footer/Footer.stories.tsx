import React from "react";
import { Story, Meta } from "@storybook/react";
import { Footer } from "./Footer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default {
  title: "UI Components/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
} as Meta;

const Template: Story = () => <Footer />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
