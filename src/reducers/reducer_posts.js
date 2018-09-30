import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // how we would do it in es5
      // const newState = { ... state };
      // newState[post.id] = post;
      // return newState;

      // how we would do it in es6
      return { ...state, [action.payload.data.id] : action.payload.data};
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
