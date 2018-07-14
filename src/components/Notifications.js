import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setNotif, clearNotif} from 'store/actions';

class Notifications extends Component {
  render() {
    let notifications = this.props.notifications;

    return (
      <div>
        {
          notifications.notifications.map((notif, key) => {
            return (
              <div className={`notification is-${notif.type}`} style={{zIndex: 31, position: 'fixed', right: 15, top: 15}} key={key}>
                <button className="delete" onClick={() => this.props.actions.clearNotif()}></button>
                {notif.messages}
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setNotif, clearNotif}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)