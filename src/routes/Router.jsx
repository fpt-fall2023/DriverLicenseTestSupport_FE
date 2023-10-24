import AdminRouteData from "./AdminRouteData";
import RouteData from "./RouteData"
import { Route, Routes } from "react-router-dom";

const isAdmin = localStorage.getItem('isAdmin');

const Router = () => {
    const pageRouter = RouteData.map((router, index) => {
        return <Route key={index} title={router.title} path={router.path} element={router.element} />
    })
    const adminRouter = AdminRouteData.map((router, index) => {
        return isAdmin == "true" ? <Route key={index} title={router.title} path={router.path} element={router.element} /> : null
    })
    return <Routes>{pageRouter}{adminRouter}</Routes>
}

export default Router