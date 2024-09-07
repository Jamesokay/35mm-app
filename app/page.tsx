import { fetchMovies } from "./lib/actions";
import PosterCard from "./ui/components/PosterCard";
import Slider from "./ui/components/Slider";
import HeroSearch from "./ui/home/HeroSearch";

const Home = async () => {
  const popular = await fetchMovies("popular");
  const topRated = await fetchMovies("top_rated");
  const upcoming = await fetchMovies("upcoming");

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 flex w-full justify-center">
        <img
          className="w-[100dvw] h-[100dvh] object-cover"
          src="/hero-search-image-2.jpg"
        />
      </div>
      <div className="flex flex-col bg-35mm-homepage-gradient pt-[50dvh] pb-16 z-20 gap-16">
        <HeroSearch />
        <div className="flex flex-col gap-6">
          <Slider title="Popular">
            {popular?.map((result) => (
              <PosterCard key={result.id} movie={result} />
            ))}
          </Slider>
          <Slider title="Top Rated">
            {topRated?.map((result) => (
              <PosterCard key={result.id} movie={result} />
            ))}
          </Slider>
          <Slider title="Upcoming">
            {upcoming?.map((result) => (
              <PosterCard key={result.id} movie={result} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
