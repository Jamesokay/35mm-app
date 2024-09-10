import { Suspense } from "react";
import MovieResults from "../ui/search/MovieResults";
import PeopleResults from "../ui/search/PeopleResults";
import ShowResults from "../ui/search/ShowResults";

const Page = () => {
  return (
    <div className="pt-24">
      <Suspense>
        <MovieResults />
      </Suspense>
      <Suspense>
        <ShowResults />
      </Suspense>
      <Suspense>
        <PeopleResults />
      </Suspense>
    </div>
  );
};

export default Page;
