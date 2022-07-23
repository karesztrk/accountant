import { NativeSelect, TextInput } from "@mantine/core";
import React, { ChangeEvent, FC } from "react";
import { data } from "./data";
import { useStyles } from "./styles";

interface CurrencyInputProps {
  placeholder?: string;
  label?: string;
  value?: string;
  currency?: string;
  onChange?: (value: string) => void;
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(e.target.value);
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
    <TextInput
      mt="md"
      type="number"
      placeholder={placeholder}
      label={label}
      rightSection={select}
      rightSectionWidth={92}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default CurrencyInput;
