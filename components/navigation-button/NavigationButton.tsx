import { Button, ButtonVariant } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface NavigationButton {
  href: string;
  text: string;
  variant?: ButtonVariant;
}

const NavigationButton: FC<NavigationButton> = ({ href, text, variant }) => {
  return (
    <Link href={href} passHref>
      <Button variant={variant} component="a">
        {text}
      </Button>
    </Link>
  );
};

export default NavigationButton;
