import { Group, Text } from "@mantine/core";
import React, { forwardRef } from "react";

interface DetailedItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
}

const DetailedSelectItem = forwardRef<HTMLDivElement, DetailedItemProps>(
  ({ label, description, ...others }: DetailedItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </Group>
    </div>
  ),
);

DetailedSelectItem.displayName = "DetailedSelectItem";

export default DetailedSelectItem;
