import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Homepage from "../pages/Homepage"
import Dashboard from "../pages/Dashboard"
import QuizPage from "../pages/Auth/QuizPage"
import AboutUs from "../pages/AboutUs"
import News from "../pages/News"

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
    {
        title: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />
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
    }
]

export default RouteData