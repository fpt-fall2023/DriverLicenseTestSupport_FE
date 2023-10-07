import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Homepage from "../pages/Homepage"
import Dashboard from "../pages/Dashboard"
import Quiz from "../pages/Quiz"

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
        title: "Quiz",
        path: "/quiz",
        element: <Quiz />
    }
]

export default RouteData