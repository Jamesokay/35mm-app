const HeroSearch = () => {
  return (
      <div className="w-full flex flex-col gap-4 pl-24">
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl font-semibold hero-text">Welcome</h2>
          <h3 className="text-3xl font-medium hero-text">
            Discover millions of movies, shows and people
          </h3>
        </div>
        <div className="flex w-full items-center max-w-[800px] gap-4 h-14">
          <input
            className="px-4 rounded-md bg-35mm-black-dark-opal w-full h-full text-white placeholder:text-gray-400 focus:outline-none"
            type="text"
            placeholder="Search for a movie, TV show, or person"
          />
          <button className="border border-35mm-green-bright transition-all duration-300 shadow-none hover:shadow-35mm-green-glow bg-35mm-black-dark-opal h-fit px-4 py-2 rounded-md text-35mm-green-bright text-lg font-semibold">
            Search
          </button>
        </div>
      </div>
  );
};

export default HeroSearch;
