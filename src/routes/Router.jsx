import RouteData from "./RouteData"
import { Route, Routes } from "react-router-dom";

const Router = () => {
    const pageRouter = RouteData.map(router => {
        return <Route title={router.title} path={router.path} element={router.element} />
    })
    return <Routes>{pageRouter}</Routes>
}

export default Router