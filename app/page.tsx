import { fetchMovies, fetchTrending } from "./lib/actions";
import PosterCard from "./ui/components/PosterCard";
import Slider from "./ui/components/Slider";
import HeroSearch from "./ui/home/HeroSearch";

const Home = async () => {
  const trendingMovies = await fetchTrending("movie", "week");
  const trendingShows = await fetchTrending('tv', 'week');
  const topRatedMovies = await fetchMovies("top_rated");
  const upcomingMovies = await fetchMovies("upcoming");

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 flex w-full justify-center">
        <img
          className="w-[100dvw] h-[100dvh] object-cover"
          src="/hero-search-image-2.jpg"
          alt="Hero image"
        />
      </div>
      <div className="flex flex-col bg-35mm-homepage-gradient pt-[50dvh] pb-16 z-20 gap-16">
        <HeroSearch />
        <div className="flex flex-col gap-6">
          <Slider title="Trending Movies">
            {trendingMovies?.map((result) => (
              <PosterCard key={result.id} content={result} />
            ))}
          </Slider>
          <Slider title="Trending TV">
            {trendingShows?.map((result) => (
              <PosterCard key={result.id} content={result} />
            ))}
          </Slider>
          <Slider title="Top Rated Movies">
            {topRatedMovies?.map((result) => (
              <PosterCard key={result.id} content={result} />
            ))}
          </Slider>
          <Slider title="In Cinemas Soon">
            {upcomingMovies?.map((result) => (
              <PosterCard key={result.id} content={result} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
