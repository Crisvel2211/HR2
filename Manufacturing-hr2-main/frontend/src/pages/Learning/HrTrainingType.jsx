import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import TrainingType from "../../Components/TrainingType";


function HrTrainingType (){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <TrainingType/>
          </div>
        </div>
    );
  };
  
  export default HrTrainingType;