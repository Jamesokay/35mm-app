import {
  convertVoteAverageToPercentage,
  formatDateString,
  formatMovieDuration,
} from "@/app/lib/helpers";
import BookmarkIcon from "../svg/BookmarkIcon";
import HeartIcon from "../svg/HeartIcon";
import ListIcon from "../svg/ListIcon";
import ImageComponent from "./ImageComponent";
import Tooltip from "./Tooltip";
import CircularRating from "./CircularRating";
import { FC } from "react";
import { MovieDetails, ShowDetails } from "@/app/lib/types";
import MovieHeaderCredits from "./MovieHeaderCredits";

const ContentHeaderSection: FC<{ content: MovieDetails | ShowDetails }> = ({
  content,
}) => {
  const isMovie = "title" in content;

  return (
    <div className="flex px-24 gap-8 bg-35mm-backdrop-gradient">
      <div className="shadow-xl">
        {content?.poster_path && (
          <ImageComponent
            className="w-[300px] min-w-[300px] h-auto rounded-md"
            type="poster_sizes"
            filePath={content?.poster_path}
            alt={isMovie ? content.title : content.name}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 flex-auto justify-end">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-medium overlay-text">
            {isMovie ? content.title : content.name}
          </h1>
          <div className="flex text-sm gap-1 text-35mm-off-white overlay-text">
            <span>
              {formatDateString(
                isMovie ? content?.release_date : content?.first_air_date
              )}
            </span>
            {isMovie && content?.runtime && (
              <>
                <span className="opacity-70 font-bold">·</span>
                <span>{formatMovieDuration(content?.runtime)}</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {content.genres?.map((genre) => (
              <button
                key={genre.id}
                className="bg-35mm-black-dark-opal border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow rounded-full text-sm px-2 py-1"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CircularRating
              percentage={convertVoteAverageToPercentage(content.vote_average)}
              size={50}
            />
            <p className="font-medium overlay-text">User Score</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Overview</h3>
            <p className="text-35mm-off-white">{content.overview}</p>
          </div>
          {isMovie ? <MovieHeaderCredits movie={content} /> : null}
          <div className="flex gap-3">
            <Tooltip text="Add to list">
              <button
                aria-label="Add to list"
                className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal"
              >
                <ListIcon />
              </button>
            </Tooltip>
            <Tooltip text="Add to Favourites">
              <button
                aria-label="Add to Favourites"
                className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal"
              >
                <HeartIcon />
              </button>
            </Tooltip>
            <Tooltip text="Add to Watchlist">
              <button
                aria-label="Add to Watchlist"
                className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal"
              >
                <BookmarkIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeaderSection;
