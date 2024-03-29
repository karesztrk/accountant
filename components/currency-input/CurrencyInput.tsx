import { NativeSelect, NumberInput } from "@mantine/core";
import { ChangeEvent, CSSProperties, FC } from "react";
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
  style?: CSSProperties;
  expense?: boolean;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  placeholder,
  label,
  onChange: onChangeProp,
  onCurrenyChange: onCurrenyChangeProp,
  value,
  currency,
  required,
  style,
  expense,
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

  const format = (value?: string) => {
    if (!value) {
      return "";
    }

    let number = parseFloat(value);
    if (Number.isNaN(number)) {
      return "";
    }

    if (expense && number > 0) {
      number *= -1;
    }
    return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parse = (value?: string) =>
    value ? value.replace(/\$\s?|(,*)/g, "") : "";

  return (
    <NumberInput
      placeholder={placeholder}
      label={label}
      rightSection={select}
      rightSectionWidth={92}
      value={value}
      onChange={onChange}
      required={required}
      max={expense ? 0 : undefined}
      min={expense ? undefined : 0}
      precision={2}
      hideControls
      style={style}
      parser={parse}
      formatter={format}
    />
  );
};

export default CurrencyInput;
