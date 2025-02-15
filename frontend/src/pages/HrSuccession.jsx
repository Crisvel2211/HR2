import Sidebar from "../Components/Sidebar"
import Search from "../Components/Search"
import Succession from "../Components/succession";


function HrSuccession (){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Succession/>
          </div>
        </div>
    );
  };
  
  export default HrSuccession;