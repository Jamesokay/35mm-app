import { fetchPersonById } from "@/app/lib/actions";
import PersonHeaderSection from "@/app/ui/components/PersonHeaderSection";
import PosterCard from "@/app/ui/components/PosterCard";
import Slider from "@/app/ui/components/Slider";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const person = await fetchPersonById(id);

  if (!person) notFound();

  return (
    <div className="flex flex-col pt-24 gap-8">
      <PersonHeaderSection person={person} />
      <Slider title="Known for">
        {person.combined_credits?.cast.map((credit) => (
          <PosterCard key={credit.id} content={credit} />
        ))}
      </Slider>
    </div>
  );
}
