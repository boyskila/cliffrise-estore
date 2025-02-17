import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const Breadcrumbs = () => {
  return (
    <nav className="flex bg-transparent" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <div className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
            Information
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-3" />
            <div className="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400">
              Shipping
            </div>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRightIcon className="h-3" />
            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
              Payment
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};
