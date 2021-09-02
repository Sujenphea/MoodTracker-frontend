import { MockedProvider } from "@apollo/client/testing";
import "../src/styles/sanitise.css";
import "../src/styles/globals.css";

export const parameters = {
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      {
        name: "mydark",
        value: "#121212",
      },
      {
        name: "mylight",
        value: "#f0f0f0",
      },
    ],
  },
};
