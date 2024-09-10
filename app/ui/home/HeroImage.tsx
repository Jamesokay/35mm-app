import { MovieResult, ShowResult } from "@/app/lib/types";
import { FC } from "react";

const HeroImage: FC<{ content: MovieResult | ShowResult }> = ({ content }) => {
  const isMovie = "title" in content;
  return (
    <img
      className="w-[100dvw] h-[100dvh] object-cover"
      src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
      alt={isMovie ? content.title : content.name}
    />
  );
};

export default HeroImage;
