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
      <div className="test relative flex flex-col h-full transition-all duration-500 ease-out hover:scale-[1.2] hover:z-20 rounded-lg overflow-hidden">
        <div className="relative w-[200px] min-w-[200px] h-fit">
          <ImageComponent
            className="w-full h-auto"
            type="poster_sizes"
            filePath={movie?.poster_path}
            alt={movie?.title}
          />

          <div className="absolute p-3 border border-gray-200 rounded-lg backdrop-blur-sm gap-2 left-0 top-0 flex flex-col bg-35mm-black-dark-opal overflow-hidden h-full w-full z-20 transition-opacity duration-500 ease-out opacity-0 hover:opacity-100">
            
            <p className="text-sm font-semibold">{movie?.title}</p>
            <p className="text-xs text-gray-400">
              {formatDateString(movie?.release_date)}
            </p>
            <p className="text-xs line-clamp-[8]">{movie?.overview}</p>
            <div className="flex w-full justify-end mt-auto">
              <CircularRating
                percentage={convertVoteAverageToPercentage(movie?.vote_average)}
              />
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col px-2">
          <p className="font-medium line-clamp-2">{movie?.title}</p>
          <p className="text-sm text-gray-400">
            {formatDateString(movie?.release_date)}
          </p>
        </div> */}
      </div>
    </Link>
  );
};

export default PosterCard;
