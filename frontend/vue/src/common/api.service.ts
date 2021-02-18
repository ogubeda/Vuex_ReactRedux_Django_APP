import axios from 'axios';
import Vue from "vue";
import { Song } from '../models/Song';
import API_URL from './config'
import JwtService from './jwt.service';

const api = 'api';

class ApiService {
  contructor() {
   console.log("Created ApiService");
   axios.defaults.baseURL = API_URL
  }// end_constructor

  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  }

  query(resource: string, params: any) {
    axios.get(resource, params).catch((error: string) => {
      throw new Error(`ApiService ${error}`);
    })
  }// end_query

  get(resource: string, slug = "") {
    let url = `${API_URL}/${resource}`;
    if (slug) url = url + `${slug}`
    return axios.get(url).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }

  post(resource: string, params: any) {
    const url = `${API_URL}/${resource}`;
    return axios.post(url, params);
  }

  post2(resource: string) {
    const url = `${API_URL}/${resource}`;
    return axios.post(url);
  }

  update(resource: string, slug: string, params: any) {
    return axios.put(`${resource}/${slug}`, params);
  }

  put(resource: string, params: any) {
    return axios.put(`${resource}`, params);
  }

  delete(resource: string) {
    return axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
}

export const apiService = new ApiService();

class SongService {
  constructor() {
    console.log('creating new instance of song.service');
  }

  deleteSong(song: Song) {
    return axios.delete(`${API_URL}/songs/${song.slug}`);
  }
  getSongs() {
    return apiService.get('songs');
  }
  getSong(slug: string) {
    return axios.get<Song>(`${API_URL}/songs/${slug}`);
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

class FavoriteService {
  constructor() {
    console.log('creating new instance of favorite.service');
    apiService.setHeader();
  }
  add(slug: string) {
    return apiService.post2(`songs/${slug}/favorite`);
  }

  remove(slug: string) {
    return apiService.delete(`songs/${slug}/favorite`);
  }
}

export const favoriteService = new FavoriteService();