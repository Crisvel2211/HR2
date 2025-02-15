import Sidebar from "../../Components/Sidebar";
import Search from "../../Components/Search";
import ListUsers from "../../Components/ListUsers";

function HrListUsers() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-col w-full">
        {/* Ensure Search is covered when modal appears */}
        <div className="relative z-10"> 
          <Search />
        </div>
        <ListUsers />
      </div>
    </div>
  );
}

export default HrListUsers
