const initState = {
  amount: 100000
}

export default function balance(state = initState, action) {
  switch (action.type) {
    case 'SET_BALANCE':
      return Object.assign({}, state, {
        amount: action.amount
      });

    default:
      return state
  }
}