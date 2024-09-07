"use server";

import {
  ClientError,
  ImageConfig,
  MovieDetails,
  MovieResult,
  NetworkError,
  ServerError,
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

export const fetchMovieById = async (
  movie_id: string
): Promise<MovieDetails | null> => {
  if (!token) return handleNoToken();
  const options = getHeaders("GET");
  try {
    const response = await fetch(
      `${API_URL}/movie/${movie_id}?append_to_response=credits&language=en-US`,
      options
    );
    const data = await handleResponse(response);
    return data;
  } catch (err) {
    return handleError(err, `Error fetching movie id:${movie_id}`);
  }
};
