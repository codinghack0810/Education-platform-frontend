// import pages
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import AdminSidebar from "./admin-sidebar";
import { Toaster } from "react-hot-toast";

// ==============================|| MAIN LAYOUT ||============================== //

const AdminLayout = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <div className="md:fixed md:w-[15%] md:h-screen  md:visible invisible h-0">
        <AdminSidebar />
      </div>
      <div className="md:w-[85%] md:left-[15%] h-screen relative">
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default AdminLayout;
