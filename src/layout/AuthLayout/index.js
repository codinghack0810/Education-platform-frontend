import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
    <div>
        <Toaster position="top-right" />
        <div>
            <Outlet />
        </div>
    </div>
    );
};

export default AuthLayout;