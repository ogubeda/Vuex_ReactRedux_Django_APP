import axios from 'axios';

import { Song } from '../models/Song';
import API_URL from './config'

const api = 'api';

class SongService {
  constructor() {
    console.log('creating new instance of song.service');
  }

  deleteSong(song: Song) {
    return axios.delete(`${API_URL}/songs/${song.slug}`);
  }
  getSongs() {
    return axios.get<Song[]>(`${API_URL}/songs`);
  }
  addSong(song: Song) {
    return axios.post(`${API_URL}/songs/`, { song });
  }
  updateSong(song: Song) {
    return axios.put(`${API_URL}/songs/${song.slug}`, { song });
  }
}

// Export a singleton instance in the global namespace
export const songService = new SongService();