import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { fetchData } from '../../ApiUtils';
import { Purchase } from '../../ChartDataUtils';


const GroupedBarChart = () => {
    const [chartData, setChartData] = useState<Purchase[]>([])
    const fieldName = 'storeLocation'

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await fetchData()

            setChartData(data)
        }
        fetchChartData()
    }, [])

    // ItemsByLocation[location] = [{item.name: count(item.name)}, {}]
    const ItemsByLocation: { [key: string]: { [key: string]: number } } = {};

    chartData.forEach((data: any) => {
        const location = data[fieldName];
        if (!ItemsByLocation[location]) {
            ItemsByLocation[location] = {};
        }
        data.items.forEach((item: any) => {
            const itemName = item.name;
            if (!ItemsByLocation[location][itemName]) {
                ItemsByLocation[location][itemName] = 0;
            }
            ItemsByLocation[location][itemName]++;
        });
    });

    // console.log(ItemsByLocation)

    const hoverColors = [
        'rgba(70, 24, 115, 1)',
        'rgba(88, 20, 142, 1)',
        'rgba(105, 16, 168, 1)',
        'rgba(140, 7, 221, 1)',
        'rgba(159, 33, 227, 1)',
        'rgba(179, 51, 233, 1)',
        'rgba(220, 147, 246, 1)',
        'rgba(234, 191, 250, 1)',
    ];

    const colors = [
        'rgba(70, 24, 115, 0.7)',
        'rgba(88, 20, 142, 0.7)',
        'rgba(105, 16, 168, 0.7)',
        'rgba(140, 7, 221, 0.7)',
        'rgba(159, 33, 227, 0.7)',
        'rgba(179, 51, 233, 0.7)',
        'rgba(220, 147, 246, 0.7)',
        'rgba(234, 191, 250, 0.7)',
    ]

    const datasets = Object.keys(ItemsByLocation).map((location, index) => {
        const itemCounts = ItemsByLocation[location];
        return {
            label: location,
            data: Object.values(itemCounts),
            backgroundColor: colors[index],
            hoverBackgroundColor: hoverColors[index],
        };
    });


    const data = {
        labels: Object.keys(ItemsByLocation),
        datasets: datasets,
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Sales' } },
            x: { title: { display: true, text: fieldName } }
        }
    };

    return (
        <div className=" w-full h-auto md:h-[600px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
            Grouped Bar Chart
            <Bar data={data} options={options} />
        </div>
    )
}

export default GroupedBarChart