// NOTIFICATIONS
export const setNotif = (notifs) => {
  return dispatch => {
    dispatch({type: 'SET_NOTIF', notifs});
    setTimeout(() => {
      dispatch({type: 'CLEAR_NOTIF'});
    }, 5000);
  }
}
export const clearNotif = () => {
  return {type: 'CLEAR_NOTIF'}
}

export const setBalance = (amount) => {
  return {type: 'SET_BALANCE', amount};
}

export const purchase = (movie_id) => {
  return {type: 'PURCHASE', movie_id};
}