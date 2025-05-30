import { Outlet } from "react-router-dom";

import SideMenu from "@/components/common/desktop/SideMenu";

const Layout = () => {
  return (
    <div>
      <SideMenu />

      <main className="ml-48">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
