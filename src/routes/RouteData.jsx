import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Homepage from '../pages/Homepage';
import QuestionPage from '../pages/Dashboard/QuestionPage';
import AddQuestionPage from '../pages/Dashboard/AddQuestionPage';
import Learning from '../pages/LearningCard/Learning';
import QuizPage from '../pages/QuizPage/QuizPage';
import AboutUs from '../pages/AboutUs/AboutUs';
import News from '../pages/News/News';
import UserProfile from '../pages/Profile/UserProfile';
import TrafficSignsPage from '../pages/TrafficSigns/TrafficSignsPage';
import Examination from '../pages/LearningCard/Examination/Examination';
import Category from '../pages/Dashboard/Category/QuestionCategory';
import EditProfile from '../pages/Profile/EditProfile';
import TrafficCategory from '../pages/Dashboard/Category/TrafficCategory';
import PracticeTest from '../pages/LearningCard/PracticeTest/PracticeTest';

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
  // {
  //     title: "Dashboard",
  //     path: "/dashboard",
  //     element: <Dashboard />
  // },
  {
    title: 'QuestionPage',
    path: '/dashboard/QuestionPage',
    element: <QuestionPage />,
  },
  {
    title: 'AddQuestionPage',
    path: '/dashboard/AddQuestionPage',
    element: <AddQuestionPage />,
  },
  {
    title: 'AddCategoryPage',
    path: 'dashboard/CategoryPage',
    element: <Category />,
  },
  {
    title: 'AddTrafficCategoryPage',
    path: 'dashboard/TrafficCategoryPage',
    element: <TrafficCategory />,
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
    title: 'Examination',
    path: '/quizpage/examination',
    element: <Examination />,
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
];

export default RouteData;
