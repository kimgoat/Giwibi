import React from "react";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as MikeIcon } from "../../assets/icons/mike.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SettingIcon } from "../../assets/icons/setting.svg";
import styled from "styled-components";

export type IconName =
  | "add"
  | "delete"
  | "home"
  | "info"
  | "mike"
  | "profile"
  | "search"
  | "setting";

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  color = "currentColor",
  size = 24,
  strokeWidth = 1,
}) => {
  const icons: { [key in IconName]: React.FC<React.SVGProps<SVGSVGElement>> } =
    {
      add: AddIcon,
      delete: DeleteIcon,
      home: HomeIcon,
      info: InfoIcon,
      mike: MikeIcon,
      profile: ProfileIcon,
      search: SearchIcon,
      setting: SettingIcon,
    };

  const IconComponent = icons[name];

  return (
    <Container>
      <StyledIcon
        as={IconComponent}
        width={size}
        height={size}
        $color={color}
        $strokeWidth={strokeWidth}
      />
    </Container>
  );
};

export default Icon;

const Container = styled.div``;
const StyledIcon = styled.svg<{ $color: string; $strokeWidth: number }>`
  stroke: ${(props) => props.$color};
  stroke-width: ${(props) => props.$strokeWidth};

  * {
    stroke: ${(props) => props.$color};
    stroke-width: ${(props) => props.$strokeWidth};
  }
`;
