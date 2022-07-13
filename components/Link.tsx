import React, { FC } from "react";
import NextLink from "next/link";
import { Button } from "@mantine/core";

interface LinkProps {
  href: string;
  text: string;
}

const Link: FC<LinkProps> = ({ href, text }) => {
  return (
    <NextLink href={href} passHref>
      <Button component="a">{text}</Button>
    </NextLink>
  );
};

export default Link;
