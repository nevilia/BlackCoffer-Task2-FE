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
        'rgba(54, 5, 104, 1)',
        'rgba(91, 42, 134, 1)',
        'rgba(209, 64, 129, 1)',
        'rgba(239, 121, 138, 1)',
        'rgba(255, 144, 179, 1)',
        'rgba(241, 133, 133, 1)'
    ];

    const colors = [
        'rgba(54, 5, 104, 0.7)',
        'rgba(91, 42, 134, 0.7)',
        'rgba(209, 64, 129, 0.7)',
        'rgba(239, 121, 138, 0.7)',
        'rgba(255, 144, 179, 0.7)',
        'rgba(241, 133, 133, 0.7)'
    ]

    const datasets = Object.keys(ItemsByLocation).map((location, index) => {
        const itemCounts = ItemsByLocation[location];
        const itemNames = Object.keys(itemCounts);
        const itemCountsArray = Object.values(itemCounts);
        return {
            label: location,
            data: itemCountsArray,
            backgroundColor: colors[index],
            hoverBackgroundColor: hoverColors[index],
        };
    });

    const itemNames = Object.values(ItemsByLocation).flatMap((counts) => Object.keys(counts))

    const uniqueItemNames = Array.from(new Set(itemNames)).sort()
    const data = {
        labels: uniqueItemNames,
        datasets: datasets,
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Sales' } },
            x: { title: { display: true, text: 'Item' } }
        }
    };

    return (
        <div className=" w-full h-auto min-h-[300px] md:h-[600px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
            Grouped Bar Chart: Item wise sales across different stores
            <Bar data={data} options={options} />
        </div>
    )
}

export default GroupedBarChart