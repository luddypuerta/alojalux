import { Route, Routes } from "react-router-dom";
import LayoutAdminComponent from "../../components/layout-admin/LayoutAdminComponent";
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
