import React from "react";

export interface SocialIconProps {
  name: string;
  url: string;
  logo: string;
}

export const FooterSocialIcon: React.FC<SocialIconProps> = ({
  name,
  url,
  logo,
}) => {
  return (
    <a href={url}>
      <img src={logo} id={logo} height="18px" alt={name} />
    </a>
  );
};
