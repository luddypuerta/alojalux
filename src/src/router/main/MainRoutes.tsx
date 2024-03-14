//Libraries
import { Route, Routes, Navigate } from "react-router-dom"

//Pages
import HomePage from "../../pages/home/HomePage"
import RoomDetailsComponent from "../../pages/home/components/rooms/RoomDetailsComponent";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/home`} />} />
            <Route path="/home" element={ <HomePage/> }/>
            <Route path="/room-details" element={ <RoomDetailsComponent/> } />
        </Routes>
    )
}
export default MainRoutes;
