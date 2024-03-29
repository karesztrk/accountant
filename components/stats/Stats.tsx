import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import IncomeChart from "components/income-chart/IncomeChart";
import { useRouter } from "next/router";
import React, { FC, useMemo } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Coin,
  Discount2,
  Receipt2,
  UserPlus,
} from "tabler-icons-react";
import { Expense, Income } from "types/database";
import { useStyles } from "./Stats.styles";
import {
  getProfit,
  getRevenueDiff,
  getRevenue,
  getProfitDiff,
} from "./Stats.util";

const icons = {
  user: UserPlus,
  discount: Discount2,
  receipt: Receipt2,
  coin: Coin,
};

interface StatsProps {
  data: {
    income: Income[];
    expense: Expense[];
  };
}

const Stats: FC<StatsProps> = ({ data: { income, expense } }) => {
  const { classes } = useStyles();
  const router = useRouter();

  const data = useMemo(
    () => [
      {
        title: "Revenue",
        icon: "receipt",
        value: `${getRevenue(income, router.locale)}`,
        diff: getRevenueDiff(income),
      },
      {
        title: "Profit",
        icon: "coin",
        value: `${getProfit(income, expense, router.locale)}`,
        diff: getProfitDiff(income, expense),
      },
    ],
    [income, expense]
  );

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

export default Stats;
