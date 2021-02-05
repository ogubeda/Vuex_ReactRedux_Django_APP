import axios from 'axios';

import { Song } from '../models/Song';

const api = 'api';

class SongService {
  constructor() {
    console.log('creating new instance of song.service');
  }

  deleteSong(song: Song) {
    return axios.delete(`${api}/songs/${song.slug}`);
  }
  getSongs() {
    return axios.get<Song[]>(`${api}/songs`);
  }
  addSong(song: Song) {
    return axios.post(`${api}/songs/`, { song });
  }
  updateSong(song: Song) {
    return axios.put(`${api}/songs/${song.slug}`, { song });
  }
}

// Export a singleton instance in the global namespace
export const songService = new SongService();