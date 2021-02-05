import { songService } from "@/common/api.service";
import { ActionsType } from "./actions.type";
import { MutationsType } from "./mutations.type";

export interface state {
  songs: any[],
  isLoading: boolean,
  songsCount: number
}

export const initialState: state = {
  songs: [],
  isLoading: false,
  songsCount: 0
}

const getters = {
  songsCount: (initialState: any) => {
    return initialState.songsCount;
  },
  songs: (initialState: any) => {
    return initialState.songs;
  },
  isLoading: (intialState: any) => {
    return initialState.isLoading;
  }
};

const actions = {
  [ActionsType.FETCH_SONGS]({ commit }: any, params: any ) {
    commit(MutationsType.FETCH_START);
    return songService.getSongs()
      .then(({ data }: any) => {
        commit(MutationsType.FETCH_END, data);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [MutationsType.FETCH_START](state: any) {
    state.isLoading = true;
  },
  [MutationsType.FETCH_END](state: any, { articles, articlesCount }: any) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [MutationsType.UPDATE_SONG_IN_LIST](state: any, data: any) {
    state.songs = state.songs.map((song: any) => {
      if (song.slug !== data.slug) {
        return song;
      }
      // article.favorited = data.favorited;
      // article.favoritesCount = data.favoritesCount;
      return song;
    });
  }
};

export default {
  initialState,
  getters,
  actions,
  mutations
};