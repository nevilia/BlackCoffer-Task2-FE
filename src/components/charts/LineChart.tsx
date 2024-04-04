import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../../ApiUtils';

const LineChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await fetchData();
            setChartData(data);
        };

        fetchChartData();
    }, []);

    const locationCounts: { [key: string]: { [key: string]: number } } = {};

    chartData.forEach((sale: any) => {
        const location = sale.storeLocation;
        if (!locationCounts[location]) {
            locationCounts[location] = { 'Online': 0, 'In store': 0, 'Phone': 0 };
        }
        const purchaseMethod = sale.purchaseMethod;
        locationCounts[location][purchaseMethod]++;
    });

    const locations = Object.keys(locationCounts);
    const onlineData = locations.map(location => locationCounts[location]['Online']);
    const inStoreData = locations.map(location => locationCounts[location]['In store']);
    const phoneData = locations.map(location => locationCounts[location]['Phone']);

    const dataSetForPurchaseMethod = [
        {
            label: 'Online',
            data: onlineData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1
        },
        {
            label: 'In Store',
            data: inStoreData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1
        },
        {
            label: 'Phone',
            data: phoneData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }
    ]

    const data = {
        labels: locations,
        datasets: dataSetForPurchaseMethod
    };

    return (
        <div className="w-full h-auto md:w-[670px] md:h-[450px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
            <h2>Line Chart of Mode of Purchases by Location</h2>
            <Line data={data} />
        </div>
    );
};

export default LineChart;
