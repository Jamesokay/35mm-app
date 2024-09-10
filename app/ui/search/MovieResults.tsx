"use client";

import { searchMovies } from "@/app/lib/actions";
import { MovieSearchResult } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import PosterCard from "../components/PosterCard";
import ResultsLoading from "./ResultsLoading";

const MovieResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchMovies(query);
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
    return <ResultsLoading title="Movies" />;
  }

  return (
    <Slider title="Movies">
      {results?.map((result) => (
        <PosterCard key={result.id} content={result} />
      ))}
    </Slider>
  );
};

export default MovieResults;
