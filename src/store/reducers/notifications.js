const initState = {
  notifications: []
}

export default function notifications(state = initState, action) {
  switch (action.type) {
    case 'SET_NOTIF':
      let params = action.notifs;
      let notifs = [];
      let notif = {
        random_id: Math.random().toString(36).substr(2, 9),
        type: params.type,
        messages: null
      };

      if ( params.response && typeof params.response.status != 'undefined') {
        if (params.response.status === 422) {
          notif.messages = [];

          for (const key of Object.keys(params.response.data.errors)) {
            params.response.data.errors[key].map((error) => {
              notif.messages.push(error);
            });
          }

        } else {
          // if status code 302/406/401/403
          notif.messages = params.response.data.message;
        }
      } else {
        notif.messages = params.response;
      }

      notifs.push(notif);
      return Object.assign({}, state, {
        notifications: notifs
      });
      break;

    case 'CLEAR_NOTIF':
      return initState;
      break;

    default:
      return state
      break;
  }
}