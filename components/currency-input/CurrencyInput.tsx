import { NativeSelect, NumberInput } from "@mantine/core";
import React, { ChangeEvent, FC } from "react";
import { data } from "./data";
import { useStyles } from "./CurrencyInput.styles";

interface CurrencyInputProps {
  placeholder?: string;
  label?: string;
  value?: number;
  currency?: string;
  onChange?: (value: number) => void;
  onCurrenyChange?: (value: string) => void;
  required?: boolean;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  placeholder,
  label,
  onChange: onChangeProp,
  onCurrenyChange: onCurrenyChangeProp,
  value,
  currency,
  required,
}) => {
  const { classes } = useStyles();

  const onChange = (value: number) => {
    if (onChangeProp) {
      onChangeProp(value);
    }
  };

  const onCurrenyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onCurrenyChangeProp) {
      onCurrenyChangeProp(e.target.value);
    }
  };

  const select = (
    <NativeSelect
      data={data}
      className={classes.input}
      value={currency}
      onChange={onCurrenyChange}
    />
  );

  return (
    <NumberInput
      placeholder={placeholder}
      label={label}
      rightSection={select}
      rightSectionWidth={92}
      value={value}
      onChange={onChange}
      required={required}
      min={0}
      hideControls
    />
  );
};

export default CurrencyInput;
