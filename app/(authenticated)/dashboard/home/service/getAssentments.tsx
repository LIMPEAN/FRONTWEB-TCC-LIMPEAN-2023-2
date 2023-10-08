import { Assentment } from "../components/Assentments";
import test from "../components/ProfileCard/test.jpg";

export function getAssentments(): Assentment[] {
  return [
    {
      evaluator: {
        name: "Felipe",
        profilePhoto: test,
      },
      description: "tlrkjsngkjrsnkjgn",
      rating: 2,
    },
    {
      evaluator: {
        name: "Andressa",
        profilePhoto: test,
      },
      description: "tlrkjsngkjrsnkjgn",
      rating: 3,
    },
    {
      evaluator: {
        name: "Gustavo",
        profilePhoto: test,
      },
      description: "tlrkjsngkjrsnkjgn",
      rating: 5,
    },
    {
      evaluator: {
        name: "Giovana",
        profilePhoto: test,
      },
      description: "tlrkjsngkjrsnkjgn",
      rating: 5,
    },
    {
      evaluator: {
        name: "Stephany",
        profilePhoto: test,
      },
      description: "tlrkjsngkjrsnkjgn",
      rating: 2,
    },
  ];
}
