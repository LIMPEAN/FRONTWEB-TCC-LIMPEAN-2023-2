import { Card } from "flowbite-react";

interface CardDescriptionProps {
  title: string;
  text: string;
}

export default function CardDescription({
  title,
  text,
}: CardDescriptionProps) {
  return (
    <Card className="sm:col-span-1 sm:row-span-1 w-full">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
      </h5>

      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {text}
      </p>
    </Card>
  );
}
