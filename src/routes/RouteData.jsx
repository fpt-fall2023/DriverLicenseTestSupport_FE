import Login from "../pages/Login"
import Register from "../pages/Register"
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
        element: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        element: "Quiz",
        path: "/quiz",
        element: <Quiz />
    }
]

export default RouteData