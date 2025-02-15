import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Training from "../../Components/Training";


function HrTraining (){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Training/>
          </div>
        </div>
    );
  };
  
  export default HrTraining;