import React from "react";
import githubDark from "../../assets/logos/github_dark.png";
import { Story, Meta } from "@storybook/react";
import { SocialIconProps, FooterSocialIcon } from "./SocialIcon";

export default {
  title: "UI Components/SocialIcon",
  component: FooterSocialIcon,
} as Meta;

const Template: Story<SocialIconProps> = (args) => (
  <FooterSocialIcon {...args} />
);

export const GithubIcon = Template.bind({});
GithubIcon.args = {
  name: "GitHub",
  url: "https://github.com/sujenphea/MoodTracker",
  logo: githubDark,
};
