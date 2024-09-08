// TMDB Data Types

export type ImageConfig = {
  backdrop_sizes: string[];
  base_url: string;
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  secure_base_url: string;
  still_sizes: string[];
};

type BaseResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

export type ShowResult = BaseResult & {
  original_name: string;
  origin_country: string[];
  first_air_date: string;
  name: string;
};

export type MovieResult = BaseResult & {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type MovieCredit = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
};

export type CastMember = MovieCredit & {
  cast_id: number;
  character: string;
  order: number;
};

export type CrewMember = MovieCredit & {
  department: string;
  job: string;
};

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
};

type BaseDetails = {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  homepage: string | null;
  id: number;
  original_language: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  vote_average: number;
  vote_count: number;
  reviews?: {
    id: number;
    page: number;
    results: Review[];
  };
  recommendations?: {
    page: number;
    results: MovieResult[] | ShowResult[];
  };
};

export type MovieDetails = BaseDetails & {
  belongs_to_collection: Collection | null;
  budget: number;
  imdb_id: string | null;
  origin_country: string[];
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number | null;
  title: string;
  video: boolean;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
};

type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
};

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

type ShowCreator = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string | null;
}

type ShowNetwork = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export type ShowDetails = BaseDetails & {
  created_by: ShowCreator[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: Episode | null;
  name: string;
  next_episode_to_air: Episode | null;
  networks: ShowNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: Season[];
  type: string;
};

// Custom Error Types

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ServerError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.name = "ServerError";
    this.status = status;
  }
  status: number;
}

export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
  }
}
