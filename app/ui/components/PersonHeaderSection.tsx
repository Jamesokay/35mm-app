import { PersonDetails } from "@/app/lib/types";
import { FC } from "react";
import ImageComponent from "./ImageComponent";
import { formatDateString } from "@/app/lib/helpers";
import Tooltip from "./Tooltip";
import ListIcon from "../svg/ListIcon";
import HeartIcon from "../svg/HeartIcon";

const PersonHeaderSection: FC<{ person: PersonDetails }> = ({ person }) => {
  return (
    <div className="flex w-full px-24 gap-8">
      <div>
        {person?.profile_path && (
          <ImageComponent
            className="w-[300px] min-w-[300px] h-auto rounded-md"
            type="profile_sizes"
            filePath={person?.profile_path}
            alt={person.name}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-medium">{person.name}</h1>
          <div className="flex gap-2">
            <span className="font-medium">{person.known_for_department}</span>
            {person.birthday && (
              <span className="text-35mm-off-white opacity-90">
                Born {formatDateString(person.birthday)}
              </span>
            )}
            {person.deathday && (
              <span className="text-35mm-off-white opacity-90">
                Died {formatDateString(person.deathday)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">Biography</p>
          <p className="text-35mm-off-white opacity-90 line-clamp-[10]">
            {person.biography}
          </p>
        </div>
        <div className="flex gap-3">
          <Tooltip text="Add to list">
            <button aria-label="Add to list" className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal">
              <ListIcon />
            </button>
          </Tooltip>
          <Tooltip text="Add to Favourites">
            <button aria-label="Add to Favourites" className="rounded-full w-10 h-10 p-3 border border-gray-300 transition-all shadow-none duration-300 hover:text-35mm-green-bright hover:border-35mm-green-bright hover:shadow-35mm-green-glow flex items-center justify-center bg-35mm-black-dark-opal">
              <HeartIcon />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PersonHeaderSection;
