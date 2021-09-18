import React from "react";
import { Story, Meta } from "@storybook/react";
import { Home } from "./Home";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Global } from "@emotion/react";

export default {
  title: "UI Components/Home",
  component: Home,
  argTypes: {
    isDarkMode: {},
  },
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

interface homeArgs {
  isDarkMode: boolean;
}

const Template: Story<homeArgs> = (homeArgs) => {
  return (
    <div>
      <Global
        styles={{
          body: {
            backgroundColor: homeArgs.isDarkMode ? "#121212" : "#f0f0f0",
            transition: "background 0.5s",
            // primary: "#BB86FC",
            // secondary: "#03DAC6",
            // error: "#CF6679",
            color: homeArgs.isDarkMode
              ? "rgba(255, 255, 255, 0.88)"
              : "rgba(70, 70, 70, 0.87)",
          },
        }}
      />
      <Home quote={"hello"} author={"helo"} />
    </div>
  );
};

export const HomeSample = Template.bind({});
HomeSample.args = {
  isDarkMode: false,
};
