import axios from 'axios';
import Vue from "vue";
import { Song } from '../models/Song';
import API_URL from './config'
import JwtService from './jwt.service';

const api = 'api';

const ApiService = {
  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  query(resource: string, params: any) {
    return axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource: string, slug = "") {
    return axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource: string, params: any) {
    return axios.post(`${resource}`, params);
  },

  update(resource: string, slug: string, params: any) {
    return axios.put(`${resource}/${slug}`, params);
  },

  put(resource: string, params: any) {
    return axios.put(`${resource}`, params);
  },

  delete(resource: string) {
    return axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

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