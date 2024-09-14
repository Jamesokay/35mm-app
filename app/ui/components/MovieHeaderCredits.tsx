import { MovieDetails } from "@/app/lib/types";
import Link from "next/link";
import { FC } from "react";

const MovieHeaderCredits: FC<{ movie: MovieDetails }> = ({ movie }) => {
  const directors = movie.credits?.crew?.filter((x) => x.job === "Director");
  const writers = movie.credits?.crew?.filter((x) => x.job === "Screenplay");
  return (
    <div className="flex flex-col gap-4">
      {!!directors?.length && (
        <div className="flex gap-2">
          <h4 className="font-medium">
            {directors?.length > 1 ? "Directors" : "Director"}
          </h4>
          {directors?.map((director) => (
            <Link
              key={director.id}
              href={`/people/${director.id}`}
              className="text-35mm-off-white transition-colors duration-300 hover:text-35mm-green-bright"
            >
              {director?.name}
            </Link>
          ))}
        </div>
      )}
      {!!writers?.length && (
        <div className="flex gap-2">
          <h4 className="font-medium">
            {writers?.length > 1 ? "Writers" : "Writer"}
          </h4>
          {writers?.map((writer) => (
            <Link
              key={writer.id}
              href={`/people/${writer.id}`}
              className="text-35mm-off-white transition-colors duration-300 hover:text-35mm-green-bright"
            >
              {writer?.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieHeaderCredits;
