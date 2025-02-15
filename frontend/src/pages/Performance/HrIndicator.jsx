import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Indicator from "../../Components/Indicator";


function HrIndicator(){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Indicator/>
          </div>
        </div>
    );
  };
  
  export default HrIndicator;