//Components
import LayoutAdminComponent from "../../components/layout-admin/LayoutAdminComponent";

//Libraries
import { Route, Routes } from "react-router-dom";

//Pages
import HotelsPage from "../../pages/hotels/HotelsPage";
import BookingsPage from "../../pages/bookings/BookingsPage";

const AdminRoutes = () => {
    return (
        <LayoutAdminComponent>
            <Routes>
                <Route path="hotels" element={<HotelsPage />} />
                <Route path="bookings" element={<BookingsPage />} />
            </Routes>
        </LayoutAdminComponent>
    );
};

export default AdminRoutes;
