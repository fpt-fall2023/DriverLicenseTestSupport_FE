import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Homepage from '../pages/Homepage';
import Learning from '../pages/LearningCard/Learning';
import QuizPage from '../pages/QuizPage/QuizPage';
import AboutUs from '../pages/AboutUs/AboutUs';
import News from '../pages/News/News';
import UserProfile from '../pages/Profile/UserProfile';
import TrafficSignsPage from '../pages/TrafficSigns/TrafficSignsPage';
import Examination from '../pages/LearningCard/Examination/Examination';
import EditProfile from '../pages/Profile/EditProfile';
import PracticeTest from '../pages/LearningCard/PracticeTest/PracticeTest';
import ErrorPage from '../pages/ErrorPage';

const RouteData = [
  {
    title: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    title: 'Register',
    path: '/register',
    element: <Register />,
  },
  {
    title: 'Homepage',
    path: '/',
    element: <Homepage />,
  },
  {
    title: 'QuizPage',
    path: '/quizpage',
    element: <QuizPage />,
  },
  {
    title: 'About Us',
    path: '/about',
    element: <AboutUs />,
  },
  {
    title: 'News',
    path: '/news',
    element: <News />,
  },
  {
    title: 'Learn',
    path: '/quizpage/learn',
    element: <Learning />,
  },

  {
    title: 'UserProfile',
    path: '/profile',
    element: <UserProfile />,
  },
  {
    title: 'EditProfile',
    path: '/profile/edit',
    element: <EditProfile />,
  },
  {
    title: 'TrafficSignsPage',
    path: '/quizpage/trafficsigns',
    element: <TrafficSignsPage />,
  },
  {
    title: 'PracticeTest',
    path: '/practice-test',
    element: <PracticeTest />,
  },
  {
    title: 'Examination',
    path: '/practice-test/examination',
    element: <Examination />,
  },
  {
    title: 'Error 404',
    path: '*',
    element: <ErrorPage />,
  }
];

export default RouteData;
