import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
}
