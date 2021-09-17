import React from "react";
import { Story, Meta } from "@storybook/react";
import { Loading } from "./Loading";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Global } from "@emotion/react";

export default {
  title: "UI Components/Loading",
  component: Loading,
  argTypes: {},
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

interface loadingArgs {
  isDarkMode: boolean;
}

const Template: Story<loadingArgs> = (loadingArgs) => {
  return (
    <div>
      <Global
        styles={{
          body: {
            backgroundColor: loadingArgs.isDarkMode ? "#121212" : "#f0f0f0",
            transition: "background 0.5s",
            // primary: "#BB86FC",
            // secondary: "#03DAC6",
            // error: "#CF6679",
            color: loadingArgs.isDarkMode
              ? "rgba(255, 255, 255, 0.88)"
              : "rgba(70, 70, 70, 0.87)",
          },
        }}
      />
      <Loading />
    </div>
  );
};

export const LoadingSample = Template.bind({});
