import { Tooltip } from "@mantine/core";
import React, { FC } from "react";
import { Cash, CashOff } from "tabler-icons-react";

interface PaidIconProps {
  paid?: boolean;
}

const PaidIcon: FC<PaidIconProps> = ({ paid }) => {
  return (
    <Tooltip label={paid ? "Paid" : "Pending"}>
      {paid ? <Cash /> : <CashOff />}
    </Tooltip>
  );
};

export default PaidIcon;
