export interface IMovies {
Actors: string;
Awards: string;
BoxOffice: string;
Country: string;
DVD: string;
Director: string;
Genre: string;
Language: string;
Metascore: string;
Plot: string;
Poster: string;
Production: string;
Rated: string;
Ratings: Ratings[];
Released: string;
Runtime: string;
Title: string;
Type: string;
Writer: string;
Year: string;
imdbID: string;
imdbRating: string;
imdbVotes: string;
}

export interface Ratings {
  Source: string;
  Value: string;
}