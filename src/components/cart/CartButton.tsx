import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type Props = {
  quantity?: number;
};

export const CartButton = ({ quantity }: Props) => {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
        {quantity}
      </div>
    </div>
  );
};
