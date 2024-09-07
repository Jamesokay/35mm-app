import { fetchMovieById } from "@/app/lib/actions";
import {
  convertVoteAverageToPercentage,
  formatDateString,
  formatMovieDuration,
} from "@/app/lib/helpers";
import CircularRating from "@/app/ui/components/CircularRating";
import ImageComponent from "@/app/ui/components/ImageComponent";
import PersonCard from "@/app/ui/components/PersonCard";
import PosterCard from "@/app/ui/components/PosterCard";
import Slider from "@/app/ui/components/Slider";
import BookmarkIcon from "@/app/ui/svg/BookmarkIcon";
import HeartIcon from "@/app/ui/svg/HeartIcon";
import ListIcon from "@/app/ui/svg/ListIcon";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movie = await fetchMovieById(id);

  if (!movie) notFound();

  const castSection = movie?.credits?.cast?.filter(
    (castMember) => castMember?.profile_path
  );
  const recommendations = movie?.recommendations?.results;

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
      <div className="flex flex-col pt-[25dvh] z-20">
        <div className="flex px-24 gap-8 bg-35mm-backdrop-gradient">
          {movie?.poster_path && (
            <ImageComponent
              className="w-[300px] min-w-[300px] h-auto rounded-md"
              type="poster_sizes"
              filePath={movie?.poster_path}
            />
          )}
          <div className="flex flex-col gap-4 flex-auto justify-end">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-medium overlay-text">
                {movie.title}
              </h1>
              <div className="flex text-sm gap-1 text-35mm-off-white overlay-text">
                <span>{formatDateString(movie?.release_date)}</span>
                {movie?.runtime && (
                  <>
                    <span className="opacity-70 font-bold">·</span>
                    <span>{formatMovieDuration(movie?.runtime)}</span>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {movie.genres?.map((genre) => (
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
                  percentage={convertVoteAverageToPercentage(
                    movie.vote_average
                  )}
                  size={50}
                />
                <p className="font-medium overlay-text">User Score</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium">Overview</h3>
                <p className="text-35mm-off-white">{movie.overview}</p>
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
        <div className="py-12 bg-35mm-black-dark">
          <Slider
            title="Cast"
            secondaryButton={
              <button className="text-sm text-35mm-off-white font-medium transition-colors duration-300 hover:text-35mm-green-bright ml-auto">
                View full cast & crew
              </button>
            }
          >
            {castSection?.slice(0, 10)?.map((castMember) => (
              <PersonCard key={castMember?.id} person={castMember} />
            ))}
          </Slider>
          {/* Alternate Panel for Upcoming */}
          <Slider title="Viewers Also Liked">
            {recommendations?.map((relatedMovie) => (
              <PosterCard key={relatedMovie.id} movie={relatedMovie} />
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
}
