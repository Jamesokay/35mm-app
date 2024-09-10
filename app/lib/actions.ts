"use server";

import {
  ClientError,
  ImageConfig,
  MovieDetails,
  MovieResult,
  MovieSearchResponse,
  NetworkError,
  PersonDetails,
  PersonSearchResponse,
  ServerError,
  ShowDetails,
  ShowResult,
  ShowSearchResponse,
} from "./types";

const API_URL = "https://api.themoviedb.org/3";
const token = process.env.TMDB_READ_ACCESS;

const getHeaders = (method: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return {
    method,
    headers,
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} - ${response.statusText}`
    );
  }
  return response.json();
};

const handleError = (err: unknown, contextMessage: string) => {
  if (
    err instanceof NetworkError ||
    err instanceof ServerError ||
    err instanceof ClientError
  ) {
    console.error(`${contextMessage}: Custom Error:`, err.message);
  } else if (err instanceof Error) {
    console.error(`${contextMessage}: Unexpected error:`, err.message);
  } else {
    console.error(`${contextMessage}: Unexpected error:`, err);
  }
  throw err;
};

const handleNoToken = (): null => {
  console.warn("TMDB_READ_ACCESS is not defined. Returning null.");
  return null;
};

export const fetchConfig = async (): Promise<ImageConfig | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(`${API_URL}/configuration`, options);
    const data = await handleResponse(response);
    return data?.images;
  } catch (err) {
    return handleError(err, "Error fetching image configuration data");
  }
};

export const fetchMovies = async (
  type: "popular" | "top_rated" | "upcoming" | "now_playing"
): Promise<MovieResult[] | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/movie/${type}?language=en-US&page=1`,
      options
    );
    const data = await handleResponse(response);
    return data?.results;
  } catch (err) {
    return handleError(err, `Error fetching ${type}`);
  }
};

export const fetchShows = async (
  type: "popular" | "top_rated" | "airing_today" | "on_the_air"
): Promise<ShowResult[] | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/tv/${type}?language=en-US&page=1`,
      options
    );
    const data = await handleResponse(response);
    return data?.results;
  } catch (err) {
    return handleError(err, `Error fetching ${type}`);
  }
};

export const fetchTrending = async (
  type: "tv" | "movie",
  window: "day" | "week"
): Promise<MovieResult[] | ShowResult[] | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/trending/${type}/${window}?language=en-US&page=1`,
      options
    );
    const data = await handleResponse(response);
    return data?.results;
  } catch (err) {
    return handleError(err, `Error fetching ${type}`);
  }
};

export const fetchMovieById = async (
  movie_id: string
): Promise<MovieDetails | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/movie/${movie_id}?append_to_response=credits,recommendations,reviews&language=en-US`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(err, `Error fetching movie id:${movie_id}`);
  }
};

export const fetchShowById = async (
  series_id: string
): Promise<ShowDetails | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/tv/${series_id}?append_to_response=credits,recommendations,reviews&language=en-US`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(err, `Error fetching movie id:${series_id}`);
  }
};

export const fetchPersonById = async (
  person_id: string
): Promise<PersonDetails | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/person/${person_id}?append_to_response=combined_credits&language=en-US`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(err, `Error fetching person id:${person_id}`);
  }
};

export const searchPeople = async (
  query: string
): Promise<PersonSearchResponse | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `${API_URL}/search/person?query=${encodedQuery}`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(
      err,
      `Error fetching search results for query: ${query}`
    );
  }
};

export const searchShows = async (
  query: string
): Promise<ShowSearchResponse | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `${API_URL}/search/tv?query=${encodedQuery}`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(
      err,
      `Error fetching search results for query: ${query}`
    );
  }
};

export const searchMovies = async (
  query: string
): Promise<MovieSearchResponse | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `${API_URL}/search/movie?query=${encodedQuery}`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(
      err,
      `Error fetching search results for query: ${query}`
    );
  }
};
