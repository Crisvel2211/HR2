import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"
import Jobposting from "../../Components/Jobposting";

function HrJobposting() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          <Jobposting/>
          </div>
        </div>
    </div>
  )
}

export default HrJobposting;