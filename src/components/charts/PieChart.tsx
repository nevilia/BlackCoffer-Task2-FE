import { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2"
import { ChartOptions } from 'chart.js';
import { fetchData } from '../../ApiUtils';
import { Purchase } from '../../ChartDataUtils';

const PieChart = () => {
    const [chartData, setChartData] = useState<Purchase[]>([])
    const [filterData, setFilterData] = useState('purchaseMethod')

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await fetchData()

            setChartData(data)
        }
        fetchChartData()
    }, [])

    // console.log(chartData)

    const ModeCounts: { [key: string]: number } = {
        'Online': 0,
        'In store': 0,
        'Phone': 0
    };

    const CouponUsed: {[key: string]: number} = {
        'true': 0,
        'false': 0
    }

    // console.log(chartData[1].purchaseMethod)

    chartData.forEach((data: any) => {
        const purchaseMethod = data.purchaseMethod;
        ModeCounts[purchaseMethod]++;
        data.couponUsed ? CouponUsed['true']++ : CouponUsed['false']++
    })

    const dataToUse = filterData === 'purchaseMethod' ? ModeCounts : CouponUsed;
    console.log(ModeCounts)
    console.log(CouponUsed)

    const bgColPurchaseMethod = [
        'rgba(82, 46, 56, 0.8)',
        'rgba(96, 36, 55, 0.8)',
        'rgba(138, 40, 70, 0.8)',
    ]
    const bgHoverPurchaseMethod = [
        'rgba(82, 46, 56, 1)',
        'rgba(96, 36, 55, 1)',
        'rgba(138, 40, 70, 1)',
    ]

    const bgColCoupon = ['rgba(83, 43, 136, 0.8)', 'rgba(155, 114, 207, 0.8)']
    const bgHoverCoupon = ['rgba(83, 43, 136, 1)', 'rgba(155, 114, 207, 1)']

    const colorToUse = filterData === 'purchaseMethod' ? bgColPurchaseMethod : bgColCoupon;
    const hoverToUse = filterData === 'purchaseMethod' ? bgHoverPurchaseMethod : bgHoverCoupon;

    const data = {
        labels: Object.keys(dataToUse),
        datasets: [{
            data: Object.values(dataToUse),
            borderColor: 'white',
            borderWidth: 1,
            backgroundColor: colorToUse,
            hoverBackgroundColor: hoverToUse
        }]
    }

    const options: ChartOptions<'pie'> = {

    }

    const onSelect = (e: any) => {
        setFilterData(e.target.value)
    }
    const option = [
        {label: 'Purchase Method', value: 'purchaseMethod'},
        {label: 'Coupon Used', value: 'couponUsed'},
    ]
    return (
        <div className="w-full h-auto  md:w-[400px] md:h-[450px] p-10 bg-gray-200 rounded-lg hover:shadow-lg">
            <select className="p-2 m-2 rounded-[18px] border border-gray-300" onChange={onSelect}>
                {option.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            Pie Chart
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart