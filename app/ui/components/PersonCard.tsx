import { CastMember, CrewMember } from "@/app/lib/types";
import { FC } from "react";
import ImageComponent from "./ImageComponent";
import Link from "next/link";

const PersonCard: FC<{ person: CastMember | CrewMember }> = ({ person }) => {
  return (
    <Link href={`/people/${person?.id}`}>
      <div className="flex flex-col max-w-[170px] hover:text-35mm-green-bright transition-colors duration-300">
        <ImageComponent
          className="w-[170px] min-w-[170px] h-auto rounded-md"
          type="profile_sizes"
          filePath={person?.profile_path || ""}
          omitLargeSizes
        />
        <div className="flex flex-col py-3 gap-2">
          <p className="font-medium">{person?.name}</p>
          <p className="text-sm text-35mm-off-white opacity-80">
            {"character" in person
              ? person.character
              : "job" in person
              ? person.job
              : null}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;
