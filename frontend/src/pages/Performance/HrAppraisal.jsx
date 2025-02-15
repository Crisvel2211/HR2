import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import PerformanceAppraisal from "../../Components/Appraisal";


function HrAppraisal(){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <PerformanceAppraisal/>
          </div>
        </div>
    );
  };
  
  export default HrAppraisal;