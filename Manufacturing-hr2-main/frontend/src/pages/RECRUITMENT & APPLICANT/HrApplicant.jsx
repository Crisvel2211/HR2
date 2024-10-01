import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Applicant from "../../Components/Applicant";


function HrApplicant() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Applicant/>
          </div>
        </div>
    </div>
  )
}

export default HrApplicant;