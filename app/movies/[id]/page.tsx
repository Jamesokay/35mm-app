import { fetchMovieById } from "@/app/lib/actions";
import {
  convertVoteAverageToPercentage,
  formatDateString,
  formatGenres,
  formatMovieDuration,
} from "@/app/lib/helpers";
import CircularRating from "@/app/ui/components/CircularRating";
import ImageComponent from "@/app/ui/components/ImageComponent";
import BookmarkIcon from "@/app/ui/svg/BookmarkIcon";
import HeartIcon from "@/app/ui/svg/HeartIcon";
import ListIcon from "@/app/ui/svg/ListIcon";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movie = await fetchMovieById(id);

  if (!movie) notFound();

  return (
    <main className="flex flex-col">
      {/* <p>{movie?.title}</p> */}
      {movie?.backdrop_path && (
        <div className="fixed top-0 flex w-full justify-center">
          <ImageComponent
            className="w-full h-[100dvh] object-cover"
            type="backdrop_sizes"
            filePath={movie?.backdrop_path}
          />
        </div>
      )}
      <div className="flex flex-col pt-[30dvh] pb-16 z-20">
        <div className="flex px-24 gap-8 bg-35mm-backdrop-gradient">
          {movie?.poster_path && (
            <ImageComponent
              className="w-[300px] h-auto rounded-md"
              type="poster_sizes"
              filePath={movie?.poster_path}
            />
          )}
          <div className="flex flex-col gap-4 flex-auto justify-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-medium overlay-text">{movie.title}</h1>
              <div className="flex gap-2 text-sm text-35mm-off-white overlay-text">
                <span>{formatDateString(movie?.release_date)}</span>
                <span>{formatGenres(movie.genres)}</span>
                {movie?.runtime && (
                  <span>{formatMovieDuration(movie?.runtime)}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CircularRating
                  percentage={convertVoteAverageToPercentage(
                    movie.vote_average
                  )}
                  size={50}
                />
                <p className="font-medium overlay-text">User Score</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium">Overview</h3>
                <p className="text-35mm-off-white">
                  {movie.overview}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal">
                    <ListIcon />
                </button>
                <button className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal">
                    <HeartIcon />
                </button>
                <button className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal">
                    <BookmarkIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1200px] bg-35mm-black-dark"></div>
      </div>
    </main>
  );
}
