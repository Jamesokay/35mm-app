import { fetchShowById } from "@/app/lib/actions";
import ContentHeaderSection from "@/app/ui/components/ContentHeaderSection";
import ImageComponent from "@/app/ui/components/ImageComponent";
import PersonCard from "@/app/ui/components/PersonCard";
import PosterCard from "@/app/ui/components/PosterCard";
import Slider from "@/app/ui/components/Slider";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const show = await fetchShowById(id);

  if (!show) notFound();

  const castSection = show?.credits?.cast?.filter(
    (castMember) => castMember?.profile_path
  );
  const recommendations = show?.recommendations?.results;

  return (
    <main className="flex flex-col">
      {show?.backdrop_path && (
        <div className="fixed top-0 flex w-full justify-center">
          <ImageComponent
            className="w-full h-[100dvh] object-cover"
            type="backdrop_sizes"
            filePath={show?.backdrop_path}
          />
        </div>
      )}
      <div className="flex flex-col pt-[25dvh] z-20">
        <ContentHeaderSection content={show} />
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
            {recommendations?.map((relatedShow) => (
              <PosterCard key={relatedShow.id} content={relatedShow} />
            ))}
          </Slider>
        </div>
      </div>
    </main>
  );
}
