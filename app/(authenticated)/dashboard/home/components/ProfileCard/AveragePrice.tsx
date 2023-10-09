import { useProfileCardContext } from "./ProfileCardContext";

interface AveragePriceProps {
  value: number;
}
export default function AveragePrice({ value }: AveragePriceProps) {
  return (
    <div className="flex items-baseline text-gray-900 dark:text-white">
      <span className="text-3xl font-semibold">R$</span>
      <span className="text-5xl font-extrabold tracking-tight">
        {value.toString()}
      </span>
      <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
        /month
      </span>
    </div>
  );
}
