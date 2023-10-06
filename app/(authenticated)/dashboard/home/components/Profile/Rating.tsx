import { Rating } from "flowbite-react";

function RatingStarsPreview() {
  return <RatingStars rating={4} />;
}

interface RatingProps {
  rating: number;
}
export default function RatingStars({ rating }: RatingProps) {
  // Create an array of Rating.Star components based on the rating value
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<Rating.Star filled={i < rating} key={i} />);
  }

  return <Rating>{stars}</Rating>;
}
