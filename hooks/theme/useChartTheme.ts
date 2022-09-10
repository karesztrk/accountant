import { useMantineTheme } from "@mantine/core";
import { Theme } from "@nivo/core";

const useChartTheme = (): Theme => {
  const theme = useMantineTheme();

  return {
    background: "transparent",
    textColor: "inherit",
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamily,
    axis: {
      domain: {
        line: {
          stroke: theme.colors.gray[7],
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fontSize: theme.fontSizes.md,
          fill: "currentColor",
        },
      },
      ticks: {
        line: {
          stroke: theme.colors.gray[7],
          strokeWidth: 1,
        },
        text: {
          fontSize: theme.fontSizes.xs,
          fill: "currentColor",
        },
      },
    },
    grid: {
      line: {
        stroke: "#dddddd",
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fontSize: 11,
        fill: "currentColor",
      },
    },
    annotations: {
      text: {
        fontSize: 13,
        fill: "#333333",
        outlineWidth: 2,
        outlineColor: theme.colors.gray[0],
        outlineOpacity: 1,
      },
      link: {
        stroke: "#000000",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: theme.colors.gray[0],
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#000000",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: theme.colors.gray[0],
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#000000",
        outlineWidth: 2,
        outlineColor: theme.colors.gray[0],
        outlineOpacity: 1,
      },
    },
    tooltip: {
      container: {
        background: theme.colors.gray[0],
        color: theme.colors.dark[7],
        fontSize: 12,
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
  };
};

export default useChartTheme;
