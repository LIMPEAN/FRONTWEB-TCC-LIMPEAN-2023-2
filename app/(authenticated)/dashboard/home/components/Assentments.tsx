import { Card, Carousel } from "flowbite-react";
import Image, { StaticImageData } from "next/image";
import RatingStars from "./RatingStars";

type User = {
  name: string;
  profilePhoto: StaticImageData;
};
export type Assentment = {
  evaluator: User;
  rating: number;
  description: string;
};

interface AssentmentsProps {
  assentments: Assentment[];
}
export default function Assentments({ assentments }: AssentmentsProps) {
  const items = assentments.map(({ evaluator, rating, description }, index) => {
    return (
      <Card className="h-50 w-50" key={index}>
        <div className="flex items-center mb-4 space-x-4">
          <Image
            className="w-10 h-10 rounded-full"
            src={evaluator.profilePhoto}
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{evaluator.name}</p>
            </h5>
            <RatingStars rating={rating} />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {description}
        </p>
      </Card>
    );
  });

  return <div>{items}</div>;
}

function prevCarroussel() {
  return (
    <Carousel className="w-screen h-screen">
      <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
        Slide 1
      </div>
      <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
        Slide 2
      </div>
      <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
        Slide 3
      </div>
    </Carousel>
  );
}
