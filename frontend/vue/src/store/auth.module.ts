import  ApiService  from "@/common/api.service";
import  JwtService  from "@/common/jwt.service.ts";
import { ActionsType } from "./actions.type";
import { MutationsType } from "./mutations.type";

export interface State {
  Errors: any;
  User: any;
  IsAuthenticated: any;
}

export const InitialState: State = {
  Errors: null,
  User: {},
  IsAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser(state: State) {
    return state.User;
  },
  isAuthenticated(state: State) {
    return state.IsAuthenticated;
  }
};

const actions = {
  [ActionsType.LOGIN](context: any, credentials: any) {
    return new Promise(resolve => {
      ApiService.post("users/login", { user: credentials })
        .then(({ data }) => {
          context.commit(MutationsType.SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(MutationsType.SET_ERROR, response.data.errors);
        });
    });
  },
  [ActionsType.LOGOUT](context: any) {
    context.commit(MutationsType.PURGE_AUTH);
  },
  [ActionsType.REGISTER](context: any, credentials: any) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(MutationsType.SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(MutationsType.SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [ActionsType.CHECK_AUTH](context: any) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          context.commit(MutationsType.SET_AUTH, data.user);
        })
        .catch(({ response }) => {
          context.commit(MutationsType.SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(MutationsType.PURGE_AUTH);
    }
  },
  [ActionsType.UPDATE_USER](context: any, payload: any) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image,
      password
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(MutationsType.SET_AUTH, data.user);
      return data;
    });
  }
};

const mutations = {
  [MutationsType.SET_ERROR](state: State, error: any) {
    state.Errors = error;
  },
  [MutationsType.SET_AUTH](state: State, user: any) {
    state.IsAuthenticated = true;
    state.User = user;
    state.Errors = {};
    JwtService.saveToken(state.User.token);
  },
  [MutationsType.PURGE_AUTH](state: State) {
    state.IsAuthenticated = false;
    state.User = {};
    state.Errors = {};
    JwtService.destroyToken();
  }
};

export default {
  InitialState,
  actions,
  mutations,
  getters
};