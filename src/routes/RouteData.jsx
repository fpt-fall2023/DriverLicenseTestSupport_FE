import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Homepage from "../pages/Homepage"
import QuestionPage from "../pages/Dashboard/QuestionPage"
import AddQuestionPage from "../pages/Dashboard/AddQuestionPage"
import Learning from "../pages/LearningCard/Learning"
import QuizPage from "../pages/Auth/QuizPage"
import AboutUs from "../pages/AboutUs"
import News from "../pages/News/News"

const RouteData = [
    {
        title: "Login",
        path: "/login",
        element: <Login />
    },
    {
        title: "Register",
        path: "/register",
        element: <Register />
    },
    {
        title: "Homepage",
        path: "/",
        element: <Homepage />
    },
    // {
    //     title: "Dashboard",
    //     path: "/dashboard",
    //     element: <Dashboard />
    // },
    {
        title: "QuestionPage",
        path: "/dashboard/QuestionPage",
        element: <QuestionPage />
    },
    {
        title: "AddQuestionPage",
        path: "/dashboard/AddQuestionPage",
        element: <AddQuestionPage />
    },
    {
        title: "QuizPage",
        path: "/quizpage",
        element: <QuizPage />
    },
    {
        title: "About Us",
        path: "/about",
        element: <AboutUs />
    },
    {
        title: "News",
        path: "/news",
        element: <News />
    },
    {
        title: "News",
        path: "/quizpage/learn",
        element: <Learning />
    }
]

export default RouteData