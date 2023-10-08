"use client";
import { useEffect } from "react";
import test from "./components/ProfileCard/test.jpg";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import DashboardContainer from "./components/DashboardContainer";
import { StaticImageData } from "next/image";
import PersonalCard from "./components/PersonalCard";
import { Button, Card, Carousel, Rating } from "flowbite-react";
import AveragePrice from "./components/ProfileCard/AveragePrice";
import CardDescription from "./components/CardDescription";
import RatingStars from "./components/RatingStars";
import { getAssentments } from "./service/getAssentments";
import Assentments from "./components/Assentments";

export type Profile = {
  photo: StaticImageData;
  name: string;
  rating: number;
  biography: string;
};
export type Person = {
  age: string;
  gender: string;
  address: string;
};

const getData = () => {
  return {
    profile: {
      photo: test,
      name: "Felipe Florencio",
      rating: 5,
      biography:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum veniam, odit sequi debitis cupiditate asperiores inventore consequuntur dolorum laudantium accusantium eligendi maxime odio minus ipsam est, eum maiores pariatur consequatur!",
    },
    person: {
      age: "19",
      gender: "Masculino",
      address: "Avenida brasil",
    },
    diarist: {
      media: 4,
      averagePrice: 10.0,
    },
  };
};

export default function Home() {
  let token: string | null = null;
  useEffect(() => {
    // // if (typeof window !== "undefined") {
    // //   token = localStorage.getItem("token");
    // }
  }, []);

  const { profile, person, diarist } = getData();

  const assentments = getAssentments();

  const agendar = () => {
    console.log("Agendado com sucesso");
  };
  return (
    <DashboardContainer>
      <div className="grid gap-4 mb-4 pd-4">
        <ProfileCard
          profile={profile}
          info={
            <ProfileCard.Info>
              <ProfileCard.Image />
              <ProfileCard.Title />
              <RatingStars rating={profile.rating} />
              <AveragePrice value={diarist.averagePrice} />
            </ProfileCard.Info>
          }
        />
        <PersonalCard person={person}></PersonalCard>
        <CardDescription
          title="Biografia"
          text={profile.biography}
        ></CardDescription>
        <Assentments assentments={assentments}/>
        <Card>
          <Button size="xl" color="blue">
            Agendar
          </Button>
          <Button size="xl" color="red">
            Voltar
          </Button>
        </Card>
      </div>
    </DashboardContainer>
  );
}
