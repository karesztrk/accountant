import { Button, ButtonVariant } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface NavigationButton {
  href: string;
  text: string;
  variant?: ButtonVariant;
  shallow?: boolean;
}

const NavigationButton: FC<NavigationButton> = ({
  href,
  text,
  variant,
  shallow,
}) => {
  return (
    <Link href={href} passHref shallow={shallow}>
      <Button variant={variant} component="a">
        {text}
      </Button>
    </Link>
  );
};

export default NavigationButton;
