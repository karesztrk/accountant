import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Coin,
  Discount2,
  Receipt2,
  UserPlus,
} from "tabler-icons-react";
import { useStyles } from "./Dashboard.styles";

const data = [
  {
    title: "Revenue",
    icon: "receipt",
    value: "13,456",
    diff: 34,
  },
  {
    title: "Profit",
    icon: "coin",
    value: "4,145",
    diff: -13,
  },
  {
    title: "Coupons usage",
    icon: "discount",
    value: "745",
    diff: 18,
  },
  {
    title: "New customers",
    icon: "user",
    value: "188",
    diff: -30,
  },
];

const icons = {
  user: UserPlus,
  discount: Discount2,
  receipt: Receipt2,
  coin: Coin,
};

const Dashboard = () => {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon as keyof typeof icons];
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? "teal" : "red"}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
};

export default Dashboard;
