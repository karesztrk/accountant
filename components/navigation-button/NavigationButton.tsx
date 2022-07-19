import { Button } from "@mantine/core";
import Link from "next/link";
import React, { FC } from "react";

interface NavigationButton {
  href: string;
  text: string;
}

const NavigationButton: FC<NavigationButton> = ({ href, text }) => {
  return (
    <Link href={href} passHref>
      <Button component="a">{text}</Button>
    </Link>
  );
};

export default NavigationButton;
