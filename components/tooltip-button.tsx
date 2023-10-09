"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const TooltipButton = ({
  onClick,
  tooltipText,
  icon,
  variant,
  disabled,
  hoverColor,
}: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={onClick}
            className={`${hoverColor} hover:text-white transition delay-100 duration-200`}
            size="icon"
            variant={variant}
            disabled={disabled}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
