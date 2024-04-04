import { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2"
import { ChartOptions } from 'chart.js';
import { fetchData } from '../../ApiUtils';
import { Purchase } from '../../ChartDataUtils';

const DoughnutChart = () => {
    const [chartData, setChartData] = useState<Purchase[]>([])

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await fetchData()

            setChartData(data)
        }
        fetchChartData()
    }, [])

    // console.log(chartData)

    const tagCounts: { [key: string]: number } = {};
    chartData.forEach((data: any) => {
        data.items.forEach((item: any) => {
            item.tags.forEach((tag: string) => {
                if (!tagCounts[tag]) {
                    tagCounts[tag] = 0;
                }
                tagCounts[tag]++;
            })
        })
    })

    // console.log(tagCounts)

    const data = {
        labels: Object.keys(tagCounts),
        datasets: [{
            label: '',
            data: Object.values(tagCounts),
            borderColor: 'white',
            borderWidth: 1,
            backgroundColor: [
                'rgba(82, 46, 56, 0.5)',
                'rgba(96, 36, 55, 0.5)',
                'rgba(138, 40, 70, 0.5)',
                'rgba(185, 55, 94, 0.5)',
                'rgba(224, 87, 128, 0.5)',
                'rgba(255, 122, 162, 0.5)',
                'rgba(255, 158, 187, 0.5)',
                'rgba(255, 194, 212, 0.5)',
                'rgba(255, 224, 233, 0.5)'
            ],
            hoverBackgroundcolor: [
                'rgba(82, 46, 56, 1)',
                'rgba(96, 36, 55, 1)',
                'rgba(138, 40, 70, 1)',
                'rgba(185, 55, 94, 1)',
                'rgba(224, 87, 128, 1)',
                'rgba(255, 122, 162, 1)',
                'rgba(255, 158, 187, 1)',
                'rgba(255, 194, 212, 1)',
                'rgba(255, 224, 233, 1)'
            ]
        }]
    }

    const options: ChartOptions<'doughnut'> = {

    }
  return (
    <div className="w-full h-auto  md:w-[400px] md:h-[400px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
        Doughnut Chart
        <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart