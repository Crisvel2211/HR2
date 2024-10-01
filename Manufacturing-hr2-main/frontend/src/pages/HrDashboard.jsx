import Sidebar from "../Components/Sidebar";
import Search from "../Components/Search";
import Dashboard from "../Components/Dashboard";

function HrDashboard () {
    return ( 
        <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Dashboard/>
        </div>
      </div>
    )
}
 
export default HrDashboard; 