type Props = {
  amount: number;
  className?: string;
};

export const Price = ({ amount, className }: Props) => (
  <p className={className}>
    {amount}
    <span className="ml-1 inline">BGN</span>
  </p>
);
