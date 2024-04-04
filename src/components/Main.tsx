import BarChart from "./charts/BarChart"
import DoughnutChart from "./charts/DoughnutChart"
import GroupedBarChart from "./charts/GroupedBarChart"
import LineChart from "./charts/LineChart"
import PieChart from "./charts/PieChart"

const Main = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-6 min-h-screen h-auto bg-gray-300 rounded-lg m-4 p-10">
        <BarChart/>
        <DoughnutChart/>
        <GroupedBarChart/>
        <PieChart/>
        <LineChart/>
        
    </div>
  )
}

export default Main