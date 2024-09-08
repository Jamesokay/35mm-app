import { FC } from "react";
import Link from "next/link";
import { MovieResult, ShowResult } from "@/app/lib/types";
import CircularRating from "./CircularRating";
import {
  convertVoteAverageToPercentage,
  formatDateString,
} from "@/app/lib/helpers";
import ImageComponent from "./ImageComponent";

const PosterCard: FC<{
  content: MovieResult | ShowResult;
}> = ({ content }) => {
  const isMovie = "title" in content;

  return (
    <Link href={isMovie ? `/movies/${content.id}` : `/tv/${content.id}`}>
      <div className="test relative flex flex-col h-full transition-all duration-500 ease-out hover:scale-[1.2] hover:z-20 rounded-lg overflow-hidden">
        <div className="relative w-[200px] min-w-[200px] h-fit">
          {content.poster_path && (
            <ImageComponent
              className="w-full h-auto"
              type="poster_sizes"
              filePath={content.poster_path}
              alt={isMovie ? content.title : content.name}
            />
          )}
          <div className="absolute p-3 border border-gray-200 rounded-lg backdrop-blur-sm gap-2 left-0 top-0 flex flex-col bg-35mm-black-dark-opal overflow-hidden h-full w-full z-20 transition-opacity duration-500 ease-out opacity-0 hover:opacity-100">
            <p className="text-sm font-semibold">
              {isMovie ? content.title : content.name}
            </p>
            <p className="text-xs text-gray-400">
              {formatDateString(
                isMovie ? content.release_date : content.first_air_date
              )}
            </p>
            <p className="text-xs line-clamp-[8]">{content.overview}</p>
            <div className="flex w-full justify-end mt-auto">
              <CircularRating
                percentage={convertVoteAverageToPercentage(
                  content.vote_average
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PosterCard;
