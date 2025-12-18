
import { Application, Scholarship, Review } from './model.js';
import { User } from '../auth/model.js';
import { application } from 'express';


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

    let totalReceivedMoney = applicationFees + serviceCharge;

    let feesDistribution = [
        { _id: "Application Fees", count: applicationFees },
        { _id: "Service Charge", count: serviceCharge }
    ]

    return { feesDistribution, totalReceivedMoney }

}


export const fetchScholarships = async (query) => {
    console.log("fetch m")
    try {
        let pipeline = [];

        // match
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

        // total documents
        let scholarships = null;
        if (pipeline.length === 0) {
            scholarships = await Scholarship.find({})
        }
        else {
            scholarships = await Scholarship.aggregate(pipeline);
        }


        // sort
        if (query.sortBy) {
            pipeline.push({
                $sort: { [query.sortBy]: query.sortOrder === "asc" ? 1 : -1 }
            });
        }


        // pagination
        let totalPages = 0;
        if (query.limit) {
            let page = parseInt(query.page, 10)
            let limit = parseInt(query.limit, 10)


            totalPages = Math.floor((scholarships.length + limit - 1) / limit)

            if (totalPages < page) page = totalPages;
            let skip = (page - 1) * limit
            pipeline.push({ $skip: skip })

            pipeline.push({
                $limit: limit
            });
        }
        else if (query.count) {
            let limit = parseInt(query.count, 10)
            pipeline.push({ $limit: limit })
        }

        // fetch
        if (pipeline.length === 0) {
            scholarships = await Scholarship.find({})
        }
        else {
            scholarships = await Scholarship.aggregate(pipeline);
        }

        console.dir(scholarships)

        return { scholarships, totalPages }

    } catch (err) {
        throw Error(err.message)
    }
}


export const ApplicationAnalytics = async () => {

    try {

        const appPerScholarshipCat = await Scholarship.aggregate([
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "scholarshipId",
                    as: "apps"
                }
            },
            {
                $unwind: "$apps"
            },
            {
                $match: {
                    "apps.applicationStatus" : "approved"
                }
            },
            {
                $group: {
                    _id: "$scholarshipCategory",
                    count: { $sum: 1 }
                }
            }
        ])

        const appPerUniversity = await Scholarship.aggregate([
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "scholarshipId",
                    as: "apps"
                }
            },
            {
                $unwind: "$apps"
            },
            {
                $match: {
                    "apps.applicationStatus" : "approved"
                }
            },
            {
                $group: {
                    _id: "$universityName",
                    count: { $sum: 1 }
                }
            }
        ])

        let totalApplications = 0;
        
        appPerUniversity.forEach( () => totalApplications++ )

        return { appPerScholarshipCat, appPerUniversity, totalApplications }
    }
    catch (err) {
        return {}
    }

}


export const UserAnalytics = async () => {

    try {
        const totalUsers = await User.countDocuments();

        const usersByCategory = await User.aggregate([
            {
                $group: {
                    _id: "$role",          // group by role field
                    count: { $sum: 1 }     // count number of users in each role
                }
            }
        ]);


        return { totalUsers, usersByCategory }
    } catch (err) {

    }

}


export const ScholarshipAnalytics = async () => {

    try {
        const totalScholarships = await Scholarship.countDocuments();

        const scholarshipPerSubject = await Scholarship.aggregate([
            
            {
                $group: {
                    _id: "$subjectCategory",
                    count: { $sum: 1 }
                }
            }
        ])

        return { totalScholarships, scholarshipPerSubject }
    } catch (err) {

    }
}