import Sidebar from "../../Components/Sidebar"
import Search from "../../Components/Search"


function HrJobposting() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-col w-full">
          <Search />
          
          </div>
        </div>
    </div>
  )
}

export default HrJobposting;