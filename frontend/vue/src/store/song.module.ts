import { songService, favoriteService } from "@/common/api.service";
import { ActionsType } from "./actions.type";
import { MutationsType } from "./mutations.type";


export interface State {
  Song: any;
}

export const InitialState: State = {
  Song: {
    title: "",
    description: "",
    body: "",
  }
};


export const actions = {
  async [ActionsType.FETCH_SONG](context: any, songSlug: any) {
    // avoid extronuous network call if article exists
    const { data } = await songService.getSong(songSlug);
    context.commit(MutationsType.SET_SONG, data);
    return data;
  },
  [ActionsType.SONG_DELETE](slug: any) {
    return songService.deleteSong(slug);
  },
  async [ActionsType.FAVORITE_ADD](context: any, slug: string) {
    const { data } = await favoriteService.add(slug);
    context.commit(MutationsType.UPDATE_SONG_IN_LIST, data, { root: true });
    context.commit(MutationsType.SET_SONG, data);
    return data;
  },
  async [ActionsType.FAVORITE_REMOVE](context: any, slug: string) {
    const { data } = await favoriteService.remove(slug);
    // Update list as well. This allows us to favorite an article in the Home view.
    context.commit(MutationsType.UPDATE_SONG_IN_LIST, data, { root: true });
    context.commit(MutationsType.SET_SONG, data);
    return data;
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [MutationsType.SET_SONG](state: State, song: any) {
    state.Song = song;
  }
};

const getters = {
  song(state: State) {
    return state.Song;
  }
};

export default {
  InitialState,
  actions,
  mutations,
  getters
};
