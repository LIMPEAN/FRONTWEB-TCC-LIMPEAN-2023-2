"use client"

import { Rating } from "flowbite-react";
import { useEffect, useState } from "react";

interface assessment {
  name: string;
  photo: string;
  stars: number;
  comments: string;
}

export function AvaliacaoCard({ comments, name, photo, stars }: assessment) {
  const [starRatings, setStarRatings] = useState([false, false, false, false, false]);

  const setStars = (num: number) => {
    const newStarRatings = starRatings.map((_, index) => index < num);
    setStarRatings(newStarRatings);
  };

  useEffect(() => {
    setStars(stars)
  }, [stars])


  return (

    <>
      <div className="flex mb-4 flex-col 2xl:flex-row px-4  py-8 gap-4 items-center  text-gray-700  rounded-lg shadow dark:bg-gray-700 dark:text-white dark:border-gray-700">

        <article>
          <div className="flex items-center mb-4 space-x-4">
            <img className="w-10 h-10 rounded-full object-cover" src={photo}
              alt="imagem" />
            <div className="space-y-1 font-medium dark:text-white">
              <p>{name} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Avaliado em Novembro de 2023</time></p>
            </div>
          </div>
          <div className="flex gap-2 pb-4">
            <Rating size="xs">
              {starRatings.map((filled, index) => (
                <Rating.Star
                  key={index}
                  className="cursor-pointer"
                  filled={filled}
                />
              ))}
            </Rating>
            <span className="text-sm font-medium">{stars} estrelas</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="text-gray-600 dark:text-gray-300">{comments}</span>
          </div>
        </article>
      </div>
    </>
  )
}