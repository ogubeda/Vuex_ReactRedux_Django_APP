import { songService } from "@/common/api.service";
import { ActionsType } from "./actions.type";
import { MutationsType } from "./mutations.type";

export interface State {
  Songs: any[];
  IsLoading: boolean;
  SongsCount: number;
}

export const initialState: State = {
  Songs: [],
  IsLoading: false,
  SongsCount: 0
}

const getters = {
  songsCount: (initialState: any) => {
    return initialState.SongsCount;
  },
  songs: (initialState: any) => {
    return initialState.Songs;
  },
  song: (initialState: any) => {
    return initialState.Songs;
  },
  isLoading: (initialState: any) => {
    return initialState.IsLoading;
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
    state.IsLoading = true;
  },
  [MutationsType.FETCH_END](state: any, { songs, songsCount }: any) {
    state.Songs = songs;
    state.SongsCount = songsCount;
    state.isLoading = false;
  },
  [MutationsType.UPDATE_SONG_IN_LIST](state: any, data: any) {
    state.Songs = state.Songs.map((song: any) => {
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