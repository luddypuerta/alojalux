import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "../../pages/home/HomePage"

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/home`} />} />
            <Route path="/home" element={ <HomePage/> }/>
        </Routes>
    )
}
export default MainRoutes;
