import { Footer as MantineFooter } from "@mantine/core";

const Footer = () => {
  return (
    <MantineFooter height={60} p="md">
      Károly Török &copy;{new Date().getFullYear()}
    </MantineFooter>
  );
};

export default Footer;
