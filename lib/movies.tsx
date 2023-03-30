// 946df6f6dd6e733f1ab94bd24eeb052b
export async function getMovies(type: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

export async function getMovieDetails(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await res.json();

  return data;
}

export async function getMovieCasts(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const data = await res.json();

  return data.cast;
}

export async function getMovieRecom(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US`
  );

  const data = await res.json();

  return data.results;
}
