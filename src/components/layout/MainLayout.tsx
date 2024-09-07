import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import FlightDetail from '../smart/FlightDetails/FlightDetail';
import PassengerDetailsPage from '../smart/PassengerDetails/PassengerDetailsPage';
import HomePage from '../smart/HomePage/HomePage';
import SeatSelectionComp from '../smart/SeatSelection/SeatSelection';
import PaymentMethod from '../smart/PaymentMethod/PaymentMethod';
import FlightTicket from '../smart/FlightTicket/FlightTicket';
import Breadcrumbs from '../smart/BreadCrums';
import PrivateRouter from '../HOC/PrivateRouter/PrivateRouter';
import './MainLayout.scss';
import Login from '../smart/auth/Login';
import Signup from '../smart/auth/Signup';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  removeProfile,
  setAuthFailure,
  setAuthSuccess,
  setProfile,
} from '@client/store/auth/authActions';

const { Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthSuccess(user));
        dispatch(setProfile(user));
      } else {
        dispatch(setAuthFailure());
        dispatch(removeProfile());
      }
    });
  }, [dispatch]);

  return (
    <Layout className="bg-cloud">
      <Router>
        <Content>
          <div
            style={{
              top: 30,
              left: 30,
              position: 'absolute',
            }}
          >
            <Breadcrumbs />
          </div>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/flight-details/:id" component={FlightDetail} />
            <Redirect exact from="/" to="/home" />
            <PrivateRouter
              exact
              path="/offer-details/:id"
              component={PassengerDetailsPage}
            />
            <PrivateRouter
              exact
              path="/seat-selection/:id"
              component={SeatSelectionComp}
            />
            <PrivateRouter
              exact
              path="/payment-method"
              component={PaymentMethod}
            />
            <PrivateRouter
              exact
              path="/flight-ticket"
              component={FlightTicket}
            />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
};

export default MainLayout;
