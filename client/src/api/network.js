import { user } from './api-user';

export function getAll(path) {
  return user(`${path}/all`);
}

export function getTops(path, limit = 200) {
  return user(`${path}/top?limit=${limit}`);
}

export function topSongs(limit = 200) {
  return user(`song/top?limit=${limit}`);
}

export function topArtists(limit = 200) {
  return user(`artist/top?limit=${limit}`);
}

export function topAlbums(limit = 200) {
  return user(`album/top?limit=${limit}`);
}

export function topPlaylists(limit = 200) {
  return user(`playlist/top?limit=${limit}`);
}

export function getSongsListById(path) {
  return user(path);
}

// eslint-disable-next-line import/prefer-default-export
export default user;
