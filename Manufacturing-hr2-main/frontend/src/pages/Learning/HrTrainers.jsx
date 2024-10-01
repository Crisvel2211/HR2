import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Trainers from "../../Components/Trainers";


function HrTrainers (){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Trainers/>
          </div>
        </div>
    );
  };
  
  export default HrTrainers;