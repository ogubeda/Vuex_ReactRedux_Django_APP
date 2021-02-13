import { apiService } from "@/common/api.service";
import { ActionsType } from "./actions.type";
import { MutationsType } from "./mutations.type";

export interface State {
    Errors: any;
    Profile: any;
}

export const InitialState: State = {
    Errors: {},
    Profile: {}
}

const getters = {
  profile(State: State) {
    return State.Profile;
  }
};

const actions = {
  [ActionsType.FETCH_PROFILE](context: any, payload: any) {
    const { username } = payload;
    return apiService.get("profiles", username)
      .then(({ data } : any) => {
        context.commit(MutationsType.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [ActionsType.FETCH_PROFILE_FOLLOW](context: any, payload: any) {
    const { username } = payload;
    return apiService.post(`profiles/${username}/follow`, false)
      .then(({ data }) => {
        context.commit(MutationsType.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [ActionsType.FETCH_PROFILE_UNFOLLOW](context: any, payload: any) {
    const { username } = payload;
    return apiService.delete(`profiles/${username}/follow`)
      .then(({ data }: any) => {
        context.commit(MutationsType.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  }
};

const mutations = {
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
  [MutationsType.SET_PROFILE](state: State, profile: any) {
    state.Profile = profile;
    state.Errors = {};
  }
};

export default {
  InitialState,
  actions,
  mutations,
  getters
};