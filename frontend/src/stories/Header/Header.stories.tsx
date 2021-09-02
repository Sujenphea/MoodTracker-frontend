import React from "react";
import { Story, Meta } from "@storybook/react";
import { Header, HeaderProps } from "./Header";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default {
  title: "UI Components/Header",
  component: Header,
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

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    __typename: "User",
    id: "1",
    name: "John Doe",
    gitHub: "johndoe",
    // imageURI: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
