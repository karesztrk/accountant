import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    transition: "transform 200ms",
    padding: theme.spacing.md,
    [theme.fn.largerThan("sm")]: {
      width: "80px",
      transform: "translateX(0)",
    },
  },

  hidden: {
    transform: "translateX(-100%)",
  },

  link: {
    borderRadius: theme.radius.md,
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
  },

  active: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7],
    },
  },

  text: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));
