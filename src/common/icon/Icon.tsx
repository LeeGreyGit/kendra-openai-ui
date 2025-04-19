import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";

interface IconProps {
  src: string;
  className: string;
  isTooltip?: boolean;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ src, className, isTooltip, onClick }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={isTooltip ? t("chatbot") : ''} arrow placement="top">
      <img
        src={src}
        alt={"Icon"}
        onClick={onClick}
        className={className}
      />
    </Tooltip>
  );
};
