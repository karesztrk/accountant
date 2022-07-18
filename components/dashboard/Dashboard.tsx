import { Grid, SimpleGrid, Skeleton, useMantineTheme } from "@mantine/core";
import React from "react";

const PRIMARY_COL_HEIGHT = 300;

const Dashboard = () => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <SimpleGrid
      cols={2}
      spacing="md"
      breakpoints={[{ maxWidth: "sm", cols: 1 }]}
    >
      <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      <Grid gutter="md">
        <Grid.Col>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </Grid.Col>
      </Grid>
    </SimpleGrid>
  );
};

export default Dashboard;
