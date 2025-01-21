"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

export function DeleteItemButton({ onAction }: { onAction: () => void }) {
  return (
    <div>
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
        onClick={onAction}
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {/* {message} */}
      </p>
    </div>
  );
}
