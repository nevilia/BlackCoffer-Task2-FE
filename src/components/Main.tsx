import BarChartDiv from "./charts/BarChartDiv"
import DoughnutChartDiv from "./charts/DoughnutChartDiv"

const Main = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-6 min-h-screen h-auto bg-gray-300 rounded-lg m-4 p-10">
        <BarChartDiv/>
        <DoughnutChartDiv/>
        
    </div>
  )
}

export default Main