import { Route, Routes } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "."
import AdminRoutes from "./admin/AdminRoutes"
import MainRoutes from "./main/MainRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<PublicRoute><MainRoutes/></PublicRoute>} />
            <Route path="/admin/*" element={<PrivateRoute><AdminRoutes/></PrivateRoute>} />
        </Routes>
    )
}