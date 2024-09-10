import { MovieResult } from "./types";

const pastLives: MovieResult = {
  adult: false,
  backdrop_path: "/7HR38hMBl23lf38MAN63y4pKsHz.jpg",
  genre_ids: [18, 10749],
  id: 666277,
  original_language: "en",
  original_title: "Past Lives",
  overview:
    "Nora and Hae Sung, two childhood friends, are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life.",
  popularity: 46.015,
  poster_path: "/rzO71VFu7CpJMfF5TQNMj0d1lSV.jpg",
  release_date: "2023-06-02",
  title: "Past Lives",
  video: false,
  vote_average: 7.774,
  vote_count: 1521,
};

const aftersun: MovieResult = {
  adult: false,
  backdrop_path: "/4jdduww9j5RyzO4ITRcuBFhqNN1.jpg",
  genre_ids: [18],
  id: 965150,
  original_language: "en",
  original_title: "Aftersun",
  overview:
    "Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier. Memories real and imagined fill the gaps between miniDV footage as she tries to reconcile the father she knew with the man she didn't.",
  popularity: 44.893,
  poster_path: "/evKz85EKouVbIr51zy5fOtpNRPg.jpg",
  release_date: "2022-10-21",
  title: "Aftersun",
  video: false,
  vote_average: 7.673,
  vote_count: 1319,
};

const fallenLeaves: MovieResult = {
  adult: false,
  backdrop_path: "/cru4rjGcdHGhnPyjNXvW82jOrif.jpg",
  genre_ids: [10749, 35, 18],
  id: 986280,
  original_language: "fi",
  overview:
    "In modern-day Helsinki, two lonely souls in search of love meet by chance in a karaoke bar. However, their path to happiness is beset by obstacles – from lost phone numbers to mistaken addresses, alcoholism, and a charming stray dog.",
  popularity: 22.217,
  poster_path: "/ca9341N5crOnOCPhCJhQu0iYcTb.jpg",
  vote_average: 7.273,
  vote_count: 487,
  original_title: "Kuolleet lehdet",
  release_date: "2023-09-14",
  title: "Fallen Leaves",
  video: false,
};

export const featured = [pastLives, aftersun, fallenLeaves];
