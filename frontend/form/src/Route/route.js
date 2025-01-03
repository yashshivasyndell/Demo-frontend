import Addwords from '../components/Addwords';
import AdminChat from '../components/AdminChat';
import AdminPanel from '../components/AdminPanel';
import Dashboard from '../components/Dashboard';
import Gallary from '../components/Gallary';
import Home from '../components/Home';
import Loader from '../components/Loader';
import Notifications from '../components/Notifications';
import Profile from '../components/Profile';
import UserChat from '../components/UserChat';
import { UserLogin } from '../components/UserLogin';
import Usertable from '../components/Usertable';

const routes = [
  {
    path: '/adminpanel',
    component: AdminPanel,
    authRequired: true,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    authRequired: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    authRequired: true,
  },
  {
    path: '/gallary',
    component: Gallary,
    authRequired: true,
  },
  {
    path: '/profile',
    component: Profile,
    authRequired: true,
  },
  {
    path: '/table',
    component: Usertable,
    authRequired: true,
  },
  {
    path: '/addword',
    component: Addwords,
    authRequired: true,
  },
  {
    path: '/loader',
    component: Loader,
    authRequired: true,
  },
  {
    path: '/login',
    component: UserLogin,
    authRequired: true,
  },
  {
    path: '/notifications',
    component: Notifications,
    authRequired: true,
  },
  {
    path: '/adminchat',
    component: AdminChat,
    authRequired: true,
  },
  {
    path: '/userchat',
    component: UserChat,
    authRequired: true,
  }
  
];

export default routes;
