import { MovieResult, ShowResult } from "@/app/lib/types";
import { FC } from "react";
import PlayIcon from "../svg/PlayIcon";
import InfoIcon from "../svg/InfoIcon";
import Link from "next/link";

const HeroContent: FC<{ content: MovieResult | ShowResult }> = ({
  content,
}) => {
  const isMovie = "title" in content;

  return (
    <div className="w-full flex flex-col gap-4 pl-24">
      <div className="flex flex-col gap-3 max-w-[40dvw]">
        <div className="flex flex-col gap-1">
          <p className="font-medium overlay-text text-35mm-green-bright">
            Editor&apos;s Choice
          </p>
          <h2 className="text-5xl overlay-text font-semibold">
            {isMovie ? content.title : content.name}
          </h2>
        </div>
        <h3 className="overlay-text font-medium">{content.overview}</h3>
      </div>
      <div className="flex w-full items-center gap-4">
        <button className="flex gap-2 items-center border transition-all duration-300 shadow-none hover:shadow-35mm-green-glow bg-35mm-black-md-opal h-fit px-4 py-2 rounded-md hover:text-35mm-green-bright hover:border-35mm-green-bright font-semibold">
          <div className="flex flex-col w-4 h-4">
            <PlayIcon />
          </div>
          Trailer
        </button>
        <Link href={`/${isMovie ? "movies" : "tv"}/${content.id}`}>
          <div
            role="button"
            className="flex gap-2 items-center border transition-all duration-300 shadow-none hover:shadow-35mm-green-glow bg-35mm-black-md-opal h-fit px-4 py-2 rounded-md hover:text-35mm-green-bright hover:border-35mm-green-bright font-semibold"
          >
            <div className="flex flex-col w-4 h-4">
              <InfoIcon />
            </div>
            More Info
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
