import Movie from "../../models/movie.model.js";
import Book from "../../models/book.model.js";
import Song from "../../models/song.model.js";

export const MOVIE_ENTITY = "MOVIE";
export const LIKE_ENTITY = "LIKE";
export const BOOK_ENTITY = "BOOK";
export const SONG_ENTITY = "SONG";
export const USER_ENTTIY = "USER";
export const REVIEW_ENTITY = "REVIEW";

export const REVIEWABLE_ENTITIES = [MOVIE_ENTITY, BOOK_ENTITY, SONG_ENTITY];
export const REVIEWABLE_ENTITIY_MODELS = {
  MOVIE: Movie,
  BOOK: Book,
  SONG: Song,
};
