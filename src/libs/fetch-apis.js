const url = 'https://api.musixmatch.com/ws/1.1/';
const genresIds = {
  music: 34,
  rock: 21,
  pop: 22,
};
const apiKey = process.env.MUSIXMATCH_API_KEY;

const createTrack = ({
  id = 0,
  title = '',
  artist = '',
  genre = '',
  snippet = '',
} = {}) => ({
  id,
  title,
  artist,
  genre,
  snippet,
});

const createDevTracks = () => {
  const titles = [
    'Bocca di Rosa',
    'Sultan of swings',
    'Wish you were here',
    'Hey Jude',
    'Caruso',
    'Back to Black',
    'Starting Over',
    'Alive',
    "I'm Gonna be",
    'Vivere',
  ];
  const artists = [
    'De Andre',
    'Dire Straights',
    'Pink Floyd',
    'The Beatles',
    'Lucio Dalla',
    'Amy Winehouse',
    'Chris Stapleton',
    'Pearl Jam',
    'The Proclaimers',
    'Vasco Rossi',
  ];
  const snippets = [
    'Si sa che la gente da buoni consigli se non puo piu dare il cattivo esempio',
    'You get a shiver in the dark',
    'So, so you think you can tell heaven from hell?',
    "Hey Jude, don't make it bad",
    'Ma due occhi che ti guardano cosi vicini e veri, ti fanno scordare le parole, confondono pensieri',
    'You went back to what you knew',
    'This might not be an easy time',
    "She said I'm ready for you I can't remember anything",
    "When I get drunk, well I know I'm gonna be I'm gonna be the man who gets drunk next to you",
    'E poi pensare che domani sarà sempre meglio',
  ];
  const genre = 'pop';
  let tracks = [];
  for (let i = 0; i < titles.length; i++) {
    tracks.push(
      createTrack({
        id: i,
        title: titles[i],
        artist: artists[i],
        snippet: snippets[i],
        genre,
      })
    );
  }

  return tracks;
};
export const GENRE_ROCK = 'rock';
export const GENRE_MUSIC = 'music';
export const GENRE_POP = 'pop';

const fetchMusix = async ({
  hasLyrics = 1,
  language = 'en',
  genre = 'music',
  trackRatingOrder = 'desc',
  pageSize = 10,
  page = 1,
} = {}) => {
  const params = new URLSearchParams();
  params.set('f_has_lyrics', hasLyrics);
  params.set('f_lyrics_language', language);
  params.set('f_music_genre_id', genresIds[genre]);
  params.set('s_track_rating', trackRatingOrder);
  params.set('page_size', pageSize);
  params.set('page', page);
  params.set('apikey', apiKey);

  let search_url = new URL(`${url}track.search?${params}`);

  const res = await fetch(search_url);
  return res.json();
};

const fetchTracks = async ({
  hasLyrics = 1,
  language = 'en',
  genre = 'music',
  trackRatingOrder = 'desc',
  pageSize = 10,
  page = 1,
} = {}) => {
  try {
    let tracks = [];

    const data = await fetchMusix({
      hasLyrics,
      language,
      genre,
      trackRatingOrder,
      pageSize,
      page,
    });

    tracks = data['message']['body']['track_list'] || [];

    return tracks;
  } catch (e) {
    console.log(e);
    return [];
  }
};
const getNumberOfAvailableSongs = async ({
  genre = 'music',
  language = 'en',
} = {}) => {
  let numberOfAvailableSongs = 0;
  try {
    const data = await fetchMusix({ genre, language, pageSize: 1, page: 1 });
    numberOfAvailableSongs = data['message']['header']['available'];
  } catch (e) {
    console.log(e);
  }

  // we limit the catalog to 500 songs, in future we might extend it if the game becomes more professional
  return numberOfAvailableSongs > 500 ? 500 : numberOfAvailableSongs;
};

/*
 * Given an array of pages and a few filters, we fetch the tracks on each page
 */
const fetchTracksOnMultiplePages = async ({
  pages = [],
  language = 'en',
  genre = 'music',
  pageSize = 100,
} = {}) => {
  let tracks = [];

  try {
    await Promise.all(
      pages.map(async (page) => {
        let tracks_batch = await fetchTracks({
          genre,
          language,
          page,
          pageSize,
        });
        let createdTracks = tracks_batch.map((track) => {
          return createTrack({
            id: track.track.track_id,
            genre,
            title: track.track.track_name,
            artist: track.track.artist_name,
          });
        });
        tracks.push(...createdTracks);
      })
    );
    return tracks;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getSongSnippet = async (id = 0) => {
  const params = new URLSearchParams();
  params.set('track_id', id);
  params.set('apikey', apiKey);

  let search_url = new URL(`${url}track.snippet.get?${params}`);
  let snippet = '';
  try {
    const res = await fetch(search_url);
    snippet = await res.json();

    return snippet.message.body.snippet.snippet_body;
  } catch (e) {
    return '';
  }
};

const fetchTracksSnippets = async ({ tracks = [] } = {}) => {
  let newTracks = [...tracks]; // we don't want to modify the input
  try {
    await Promise.all(
      newTracks.map(async (track) => {
        track.snippet = await getSongSnippet(track.id);
      })
    );
    return newTracks;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const populateTracksDB = async ({
  language = 'en',
  genre = 'music',
} = {}) => {
  const numberOfAvailableSongs = await getNumberOfAvailableSongs({
    genre,
    language,
  });
  // if we are in development mode we retrieve 2 pages only
  const numberOfPages =
    process.env.NODE_ENV === 'development'
      ? 2
      : Math.ceil(numberOfAvailableSongs / pageSize);
  let pages = Array.from({ length: numberOfPages }, (x, i) => i);
  const pageSize = 100;

  let tracks = [];

  try {
    tracks = await fetchTracksOnMultiplePages({
      pages,
      genre,
      language,
      pageSize,
    });
    tracks = await fetchTracksSnippets({ tracks });
    return tracks;
  } catch (e) {
    console.log(e);
    return [];
  }
};
