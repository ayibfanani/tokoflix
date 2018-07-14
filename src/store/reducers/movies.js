const initState = {
  purchased: []
}

export default function movies(state = initState, action) {
  switch (action.type) {
    case 'PURCHASE':
      let purchased = state.purchased;
      purchased.push(action.movie_id);

      return Object.assign({}, state, {purchased});

    default:
      return state
  }
}