import React from 'react';
import { Outlet } from "react-router-dom";

const AdminScreen = () => {
  return (
    <div>AdminScreen
      <Outlet />
    </div>
  )
}

export default AdminScreen