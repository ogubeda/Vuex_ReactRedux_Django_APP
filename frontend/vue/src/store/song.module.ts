import { songService } from "@/common/api.service";
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
  }
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
