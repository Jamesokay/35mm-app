"use client";

import { searchMovies } from "@/app/lib/actions";
import { MovieSearchResult } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import PosterCard from "../components/PosterCard";
import ResultsLoading from "../components/ResultsLoading";

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
        if (response) {
          const filtered = response?.results?.filter(
            (result) => result.vote_count > 1000
          );
          setResults(filtered);
        }
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

  if (!loading && !results.length) return null;

  return (
    <Slider title="Movies">
      {results?.map((result) => (
        <PosterCard key={result.id} content={result} />
      ))}
    </Slider>
  );
};

export default MovieResults;
