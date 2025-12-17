import { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/context"

import { Pie, PieChart, ResponsiveContainer } from 'recharts';

// #region Sample data


// #endregion
function Pie1({ data, isAnimationActive = true, datakey }) {
    return (
        <div className="mx-auto" style={{ width: "100%", height: "200px", maxWidth: "600px" }}>
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
                        fill="#1d29b0"
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
        <div className="mx-auto" style={{ width: "100%", height: "300px", maxWidth: "600px" }}>
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
                        fill="#1d29b0"
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
    

    async function Fetch() {
        console.log("analytics")
        try {
            let res = await axiosInstance.get("/scholarship/analytics");
            setAnalytics(res.data)
            console.log(res.data)
            console.log( res.data.feesDistribution[0].count )
            

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
            
            
            <div className="text-xl font-bold text-(--color4) text-center" >Users  </div>
            { analytics && <Pie1  data={analytics?.usersByCategory} /> }
            <div className="text-center font-bold" > Total: { analytics?.totalUsers } </div>
            
            <br/> <br/> <br/>
            <div className="text-xl font-bold text-(--color4) text-center" >Scholarships  </div>
            <br/>
            { analytics && <Pie2  data={analytics?.scholarshipPerSubject} /> }
            <br/>
            <div className="text-center font-bold" > Total { analytics?.totalScholarships } </div>
            
            

            <br/> <br/>
            <div className="text-xl font-bold text-(--color4) text-center" >Fees Collected:  </div>
            
            
            { analytics && <Pie1 data={analytics?.feesDistribution} /> }
            <div className="text-center font-bold" > Total: ${ analytics?.totalReceivedMoney } </div>
            

            <br/> <br/>
            <div className="text-xl font-bold text-(--color4) text-center" >Approved Applications</div>
            { analytics && <Pie1 data={analytics?.appPerScholarshipCat} /> }
            <div className="text-center font-bold"> Total { analytics?.totalApplications } </div>

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