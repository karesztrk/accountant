import { Paper, useMantineTheme } from "@mantine/core";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import useChartTheme from "hooks/theme/useChartTheme";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Expense, Income } from "types/database";
import { getCurrency, toChartData } from "./IncomeChart.util";
import { patternLinesDef } from "@nivo/core";

interface IncomeChartProps {
  data: {
    income: Income[];
    expense: Expense[];
  };
}

const IncomeChart: FC<IncomeChartProps> = ({ data }) => {
  const router = useRouter();
  const chartTheme = useChartTheme();
  const theme = useMantineTheme();

  const chartData: BarDatum[] = useMemo(() => toChartData(data), [data]);
  const currency = getCurrency(data);

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{ width: "100%", height: "400px" }}
    >
      <ResponsiveBar
        data={chartData}
        keys={["income", "expense"]}
        indexBy="period"
        margin={{ top: 25, right: 25, bottom: 35, left: 75 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[theme.colors.green[7], theme.colors.red[7]]}
        borderColor={{ from: "background", modifiers: [["opacity", 0.5]] }}
        borderWidth={2}
        labelTextColor={{ from: "color", modifiers: [["darker", 2.5]] }}
        theme={chartTheme}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) =>
            new Date(value).toLocaleDateString(router.locale, {
              month: "short",
            }),
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 5,
          format: (value) =>
            new Intl.NumberFormat(router.locale, {
              style: "currency",
              currency: currency,
              currencyDisplay: "narrowSymbol",
              notation: "compact",
              compactDisplay: "long",
            }).format(value),
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role="application"
        ariaLabel="Income versus Expense chart per periods"
        valueFormat={(value) =>
          new Intl.NumberFormat(router.locale, {
            style: "currency",
            currency: currency,
            currencyDisplay: "narrowSymbol",
          }).format(value)
        }
        enableGridY={false}
        label={(value) => {
          if (!value.value) {
            return "";
          }

          const percent = value.value / (value.data.total as number);
          return new Intl.NumberFormat(router.locale, {
            style: "percent",
            signDisplay: "auto",
          }).format(percent);
        }}
        tooltipLabel={(value) => {
          return new Date(value.data.period).toLocaleDateString(router.locale, {
            month: "long",
            year: "numeric",
          });
        }}
        defs={[
          patternLinesDef("lines", {
            color: theme.colors.red[6],
            background: "inherit",
            rotation: -45,
            spacing: 7,
          }),
        ]}
        fill={[
          {
            match: {
              id: "expense",
            },
            id: "lines",
          },
        ]}
      />
    </Paper>
  );
};

export default IncomeChart;
