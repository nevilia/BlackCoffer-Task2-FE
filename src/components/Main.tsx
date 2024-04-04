import BarChart from "./charts/BarChart"
import DoughnutChart from "./charts/DoughnutChart"

const Main = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-6 min-h-screen h-auto bg-gray-300 rounded-lg m-4 p-10">
        <BarChart/>
        <DoughnutChart/>
        
    </div>
  )
}

export default Main