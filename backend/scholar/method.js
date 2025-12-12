
import { Application, Scholarship, Review } from './model.js'



export const FeesDistribution = async () => {
    let pipeline = [
        {
            $lookup: {
                from: "applications",
                localField: "_id",
                foreignField: "scholarshipId",
                as: "app"
            }
        },
        { $unwind: "$app" },
        {
            $match: { "app.paymentStatus": "paid" }
        },
        {
            $group: {
                _id: null,
                count: { $sum: "$serviceCharge" }
            }
        }
    ]

    let serviceCharge = await Scholarship.aggregate(pipeline)
    console.log("service", serviceCharge)
    serviceCharge = serviceCharge[0].count

    pipeline = [

        {
            $lookup: {
                from: "applications",
                localField: "_id",
                foreignField: "scholarshipId",
                as: "app"
            }
        },
        { $unwind: "$app" },
        {
            $match: { "app.paymentStatus": "paid" }
        },
        {
            $group: {
                _id: null,
                count: { $sum: "$applicationFees" }
            }
        }
    ]

    let applicationFees = await Scholarship.aggregate(pipeline)
    console.log(applicationFees)
    applicationFees = applicationFees[0].count


    return { totalServiceCharge: serviceCharge, totalApplicationFees: applicationFees }

}

export const fetchScholarships = async (query) => {
    console.log( "fetch m" )
    try {
        let pipeline = [];

        if (query.searchBy) {
            pipeline.push({
                $match: {
                    [query.searchBy]: {
                        $regex: query.searchPattern,
                        $options: "i"   // case-insensitive
                    }
                }
            })
        }

        let scholarships=null;
        if (pipeline.length === 0) {
            scholarships = await Scholarship.find({})
        }
        else {
            scholarships = await Scholarship.aggregate(pipeline);
        }

        

        if (query.sortBy) {
            pipeline.push({
                $sort: { [query.sortBy]: query.sortOrder === "asc" ? 1 : -1 }
            });
        }

        

        let totalPages = 0;

        if (query.limit) {
            let page = parseInt(query.page, 10)
            let limit = parseInt(query.limit, 10)
            let skip = (page-1) * limit

            totalPages = Math.floor( ( scholarships.length + limit -1 ) / limit )
            

            pipeline.push({ $skip: skip })

            pipeline.push({
                $limit: limit
            });
        } 
        else if( query.count ) {
            let limit = parseInt( query.count, 10 )
            pipeline.push( { $limit: limit } )
            
        }

        if (pipeline.length === 0) {
            scholarships = await Scholarship.find({})
        }
        else {
            scholarships = await Scholarship.aggregate(pipeline);
        }

        console.dir(scholarships)

        return  { scholarships, totalPages }

    } catch (err) {
        throw Error(err.message)
    }
}

