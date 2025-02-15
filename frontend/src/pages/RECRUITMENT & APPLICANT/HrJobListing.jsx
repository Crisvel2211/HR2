import Sidebar from "../../Components/Sidebar";
import Search from "../../Components/Search";
import JobListing from "../../Components/JobListing";

function HrJobListing() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-col w-full">
        {/* Ensure Search is covered when modal appears */}
        <div className="relative z-10"> 
          <Search />
        </div>
        <JobListing />
      </div>
    </div>
  );
}

export default HrJobListing;
