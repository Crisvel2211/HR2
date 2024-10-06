import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Indicator from "../../Components/Indicator";
import EmployeeAppraisal from "../../Components/Appraisal";


function HrAppraisal(){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <EmployeeAppraisal/>
          </div>
        </div>
    );
  };
  
  export default HrAppraisal;