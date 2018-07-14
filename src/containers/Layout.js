import React from 'react';
import Notifications from 'components/Notifications';
import Header from 'containers/Header';
import Body from 'containers/Body';
import Footer from 'containers/Footer';

const Layout = (props) => (
  <div>
    <Notifications />
    <Header />
    <Body>
      {props.children}
    </Body>
    <Footer />
  </div>
);

export default Layout;