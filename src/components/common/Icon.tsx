import React from "react";
import { ReactComponent as AddIcon } from "@icons/add.svg";
import { ReactComponent as DeleteIcon } from "@icons/delete.svg";
import { ReactComponent as HomeIcon } from "@icons/home.svg";
import { ReactComponent as InfoIcon } from "@icons/info.svg";
import { ReactComponent as MikeIcon } from "@icons/mike.svg";
import { ReactComponent as ProfileIcon } from "@icons/profile.svg";
import { ReactComponent as SearchIcon } from "@icons/search.svg";
import { ReactComponent as SettingIcon } from "@icons/setting.svg";
import { ReactComponent as LogoIcon } from "@icons/logo.svg";
import { ReactComponent as ClockIcon } from "@icons/clock.svg";
import { ReactComponent as CameraIcon } from "@icons/camera.svg";
import { ReactComponent as TimerIcon } from "@icons/timer.svg";

import styled from "styled-components";

export type IconName =
  | "add"
  | "delete"
  | "home"
  | "info"
  | "mike"
  | "profile"
  | "search"
  | "setting"
  | "logo"
  | "camera"
  | "timer"
  | "clock";

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
      logo: LogoIcon,
      clock: ClockIcon,
      camera: CameraIcon,
      timer: TimerIcon,
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
