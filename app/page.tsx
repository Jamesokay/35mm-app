import { Suspense } from "react";
import { fetchMovies, fetchTrending } from "./lib/actions";
import { featured } from "./lib/data";
import ImageComponent from "./ui/components/ImageComponent";
import PosterCard from "./ui/components/PosterCard";
import Slider from "./ui/components/Slider";
import HeroContent from "./ui/home/HeroContent";

const Home = async () => {
  const trendingMovies = await fetchTrending("movie", "week");
  const trendingShows = await fetchTrending("tv", "week");
  const topRatedMovies = await fetchMovies("top_rated");
  const featuredIndex = featured?.length
    ? Math.floor(Math.random() * featured.length)
    : 0;
  const featuredContent = featured?.[featuredIndex];

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 flex w-full justify-center">
        {featuredContent?.backdrop_path && (
          <ImageComponent
            className="w-[100dvw] h-[100dvh]"
            type="backdrop_sizes"
            filePath={featuredContent?.backdrop_path}
          />
        )}
      </div>
      <div className="flex flex-col z-20">
        <div className="flex flex-col pt-[45dvh] bg-35mm-homepage-gradient gap-12">
          {featuredContent && <HeroContent content={featuredContent} />}
          <Suspense
            fallback={<div className="w-full h-[300px] bg-red-500"></div>}
          >
            <Slider title="Trending Movies">
              {trendingMovies?.map((result) => (
                <PosterCard key={result.id} content={result} />
              ))}
            </Slider>
          </Suspense>
        </div>

        <div className="flex flex-col gap-6 bg-35mm-black-dark">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
