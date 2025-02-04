import clsx from "classnames";

export const Price = ({
  amount,
  currencyCode = "BGN",
  className,
}: {
  amount: number;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
}) => (
  <p className={className}>
    {amount}
    <span className={clsx("ml-1 inline")}>{`${currencyCode}`}</span>
  </p>
);
