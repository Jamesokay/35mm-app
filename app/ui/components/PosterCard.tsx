import { FC } from "react";
import Link from "next/link";
import { MovieResult } from "@/app/lib/types";
import CircularRating from "./CircularRating";
import {
  convertVoteAverageToPercentage,
  formatDateString,
} from "@/app/lib/helpers";
import ImageComponent from "./ImageComponent";

const PosterCard: FC<{
  movie: MovieResult;
}> = ({ movie }) => {
  return (
    <Link href={`/movies/${movie?.id}`}>
      <div className="flex flex-col h-full rounded-lg p-2 transition-colors duration-300 hover:bg-35mm-black-md overflow-hidden">
        <div className="relative w-[200px] min-w-[200px] h-fit mb-6">
          <div className="flex overflow-hidden rounded-sm">
          <ImageComponent
            className="w-full h-auto"
            type="poster_sizes"
            filePath={movie?.poster_path}
            alt={movie?.title}
          />
          </div>
          <div className="absolute left-[8px] bottom-[-23px]">
            <CircularRating
              percentage={convertVoteAverageToPercentage(movie?.vote_average)}
            />
          </div>
        </div>
        <div className="flex flex-col px-2">
          <p className="font-medium line-clamp-2">{movie?.title}</p>
          <p className="text-sm text-gray-400">
            {formatDateString(movie?.release_date)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PosterCard;
