import React from "react";
import githubLogo from "../../assets/logos/github_logo.svg";
import { Story, Meta } from "@storybook/react";
import { SocialIconProps, FooterSocialIcon } from "./SocialIcon";

export default {
  title: "UI Components/SocialIcon",
  component: FooterSocialIcon,
} as Meta;

const Template: Story<SocialIconProps> = (args) => (
  <div style={{ backgroundColor: "black" }}>
    <FooterSocialIcon {...args} />
  </div>
);

export const GithubIcon = Template.bind({});
GithubIcon.args = {
  name: "GitHub",
  url: "https://github.com/sujenphea/MoodTracker",
  logo: githubLogo,
};
