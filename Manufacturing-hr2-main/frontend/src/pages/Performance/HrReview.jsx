import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Review from "../../Components/Review";


function HrReview (){
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Review/>
          </div>
        </div>
    );
  };
  
  export default HrReview;