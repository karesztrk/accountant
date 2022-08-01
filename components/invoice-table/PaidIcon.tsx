import { Tooltip } from "@mantine/core";
import React, { FC } from "react";
import { Cash, CashOff } from "tabler-icons-react";

interface PaidIconProps {
  paid?: boolean;
}

const PaidIcon: FC<PaidIconProps> = ({ paid }) => {
  return (
    <Tooltip label={paid ? "Paid" : "Pending"}>
      <span>{paid ? <Cash /> : <CashOff />}</span>
    </Tooltip>
  );
};

export default PaidIcon;
