import { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context"

import { Pie, PieChart, ResponsiveContainer } from 'recharts';

// #region Sample data
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

// #endregion
function Pie1({ data, isAnimationActive = true, datakey }) {
    return (
        <div style={{ width: "100%", height: "200px", maxWidth: "600px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="count"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        fill="#8884d8"
                        label={(entry) => `${entry._id}: ${entry.count}`}
                        isAnimationActive={isAnimationActive}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

function Pie2({ data, isAnimationActive = true, datakey }) {
    return (
        <div style={{ width: "100%", height: "300px", maxWidth: "600px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="count"
                        startAngle={0}
                        endAngle={360}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        fill="#8884d8"
                        label={(entry) => `${entry._id}: ${entry.count}`}
                        isAnimationActive={isAnimationActive}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}




export const Analytics = () => {
    const { axiosInstance, user } = useAuthContext();
    const [analytics, setAnalytics] = useState(null);
    const [ receivedAmount, setReceivedAmount ] = useState(null)

    async function Fetch() {
        console.log("analytics")
        try {
            let res = await axiosInstance.get("/scholarship/analytics");
            setAnalytics(res.data)
            console.log(res.data)
            console.log( res.data.feesDistribution[0].count )
            setReceivedAmount(
                res.data.feesDistribution[0].count +
                res.data.feesDistribution[1].count
            )

            console.log("here")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!user) return;
        Fetch();
    }, [user])

    return (
        <div>
            
            
            <div className="text-xl font-bold" >Total Users: {analytics?.totalUsers} </div>
            { analytics && <Pie1 data={analytics?.usersByCategory} /> }
            
            <br/> <br/>
            <div className="text-xl font-bold" >Total Scholarships: { analytics?.totalScholarships } </div>
            { analytics && <Pie2 data={analytics?.appPerScholarshipCat} /> }
            

            <br/> <br/>
            <div className="text-xl font-bold" >Total Fees Collected: { receivedAmount } </div>
            { analytics && <Pie1 data={analytics?.feesDistribution} /> }
            

            <br/> <br/>
            <div className="text-xl font-bold" >Application Per University</div>

            <br/>
            <div className="flex justify-between pr-8 max-w-[800px] mb-4" >
                <div className="font-bold" >University Name</div>
                <div className="font-bold" >Number of Applications</div>
            </div>

            { analytics && analytics.appPerUniversity.map( (elem, index) => (
                <div key={index} className="box-1212 mb-4 flex justify-between  max-w-[800px]" >
                    <div> { elem._id } </div>
                    <div className="mr-24" > { elem.count } </div>
                </div>
            ) ) }
            
        </div>
    )
}