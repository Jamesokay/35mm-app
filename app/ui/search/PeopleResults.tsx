"use client";

import { searchPeople } from "@/app/lib/actions";
import { PersonSearchResult } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import PersonCard from "../components/PersonCard";
import ResultsLoading from "../components/ResultsLoading";

const PeopleResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<PersonSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchPeople(query);
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
    return <ResultsLoading title="People" />;
  }

  return (
    <div className="flex">
      <Slider title="People">
        {results?.map((result) => (
          <PersonCard key={result.id} person={result} />
        ))}
      </Slider>
    </div>
  );
};

export default PeopleResults;
