"use client";

import { searchShows } from "@/app/lib/actions";
import { ShowSearchResult } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import PosterCard from "../components/PosterCard";
import ResultsLoading from "./ResultsLoading";

const ShowResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<ShowSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchShows(query);
        if (response) setResults(response?.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchResults();
  }, [query]);

  if (loading) {
    return <ResultsLoading title="TV Shows" />;
  }

  return (
    <div className="flex">
      <Slider title="TV Shows">
        {results?.map((result) => (
          <PosterCard key={result.id} content={result} />
        ))}
      </Slider>
    </div>
  );
};

export default ShowResults;
