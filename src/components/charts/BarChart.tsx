import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { fetchData } from '../../ApiUtils';
import { Purchase } from '../../ChartDataUtils';


const BarChart = () => {
    const [chartData, setChartData] = useState<Purchase[]>([])
    const fieldName = 'storeLocation'

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await fetchData()

            setChartData(data)
        }
        fetchChartData()
    }, [])

    const filteredData = chartData.filter((data: any) => data[fieldName]);

    const uniqueXValues = Array.from(new Set(filteredData.map((data: any) => data[fieldName])));
    // console.log(uniqueXValues)
    // Calculate total price for each store location
    const totalPriceByLocation: { [key: string]: number } = {};

    filteredData.forEach((data: any) => {
        const location = data[fieldName];
        if (!totalPriceByLocation[location]) {
            totalPriceByLocation[location] = 0;
        }
        data.items.forEach((item: any) => {
            totalPriceByLocation[location] += item.price;
        });
    });

    // console.log(totalPriceByLocation);

    const data = {
        labels: uniqueXValues,
        datasets: [{
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            label: "Total Sales ($) by Store Location ",
            data: Object.values(totalPriceByLocation),
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }

    const options: ChartOptions<'bar'> = {
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Sales' } },
            x: { title: { display: true, text: fieldName } }
        }
    };

    return (
        <div className=" w-full h-auto md:w-[600px] md:h-[400px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
            Bar Chart
            <Bar data={data} options={options}></Bar>
        </div>
    )
}

export default BarChart;
