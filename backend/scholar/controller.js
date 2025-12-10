import express from "express"
import { Scholarship, Application, Review } from "./model.js"
import { requireAdmin, requireAuth, requireModerator } from "../auth/middlewire.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://localhost:5173'; // put in env
import crypto from "crypto";
import { User } from "../auth/model.js";
import { match } from "assert";
import { Types } from "mongoose";


export const scholarshipRouter = express.Router();


const AddScholarship = async (req, res, next) => {
    try {
        console.log(req.body);
        let scholarship = { ...req.body }
        scholarship.postedBy = req.user_email;
        scholarship.postedAt = new Date();
        scholarship = Scholarship(scholarship);
        await scholarship.save();
        res.status(201).json({ message: "Scholarship added successfully", scholarship });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ error: err.message });
    }
}

const DeleteScholarship = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = await Scholarship.findByIdAndDelete(id);
        res.status(200).json( { scholarship: response } );
    } catch(err) {
        console.dir(err)
        res.status(400).json( { error: err.message } )
    }
}

const UpdateScholarship = async (req, res, next) => {
    try {
        let { id } = req.params
        let updation = {...req.body};

        let scholarship = await Scholarship.findByIdAndUpdate(
            id,
            { $set: updation },
            { new: true, runValidators: true }
        )

        res.status(200).json({ scholarship })
    } catch(err)  {
        res.status(400).json( { error: err.message } )
    }
}

const FetchScholarships = async (req, res, next) => {
    let { sort, order, limit } = req.query;
    //console.log(sort, order, count);

    try {
        let pipeline = [];

        if (sort) {
            pipeline.push({
                $sort: { [sort]: order === "asc" ? 1 : -1 }
            });
        }

        if (limit) {
            pipeline.push({
                $limit: parseInt(limit, 10)
            });
        }

        let scholarships;
        if( pipeline.length === 0 ) 
        {
            scholarships = await Scholarship.find({})
        }
        else 
        {
            scholarships = await Scholarship.aggregate(pipeline); 
        }
         
        console.log(scholarships);

        res.status(200).json({ scholarships });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ error: err.message });
    }
};

const FetchScholarshipById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const scholarship = await Scholarship.findOne({ _id: id });
        if (!scholarship) throw Error("No such scholarship");
        res.status(200).json({ scholarship });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const Apply = async (req, res, next) => {

    try {

        let application = null;

        let paymentInfo = req.body;

        if (paymentInfo.applicationId) {
            application = await Application.findOne({ _id: paymentInfo.applicationId });
            if (!application) throw Error("No such application");
        }
        else {
            let scholarship = await Scholarship.findOne({ _id: paymentInfo.scholarshipId });
            if (!scholarship) throw Error("No such scholarship");

            let applicant = await User.findOne({ username: req.user_email });
            if (!applicant) throw Error("No such user");

            application = {
                scholarshipId: scholarship._id,
                applicantId: applicant._id,
                applicantName: applicant.name,
                applicantEmail: applicant.username,
                applicationDate: new Date(),
                feedback: "",
                ...paymentInfo
            }

            application = Application(application);
            await application.save();
        }

        let pipeline = [
            { $match: { _id: application._id } },
            {
                $lookup: {
                    from: "scholarships",
                    localField: "scholarshipId",
                    foreignField: "_id",
                    as: "scholarshipDetails"
                }
            },
            { $unwind: "$scholarshipDetails" },
            {
                $lookup: {
                    from: "users",
                    localField: "applicantId",
                    foreignField: "_id",
                    as: "applicantDetails"
                }
            },
            { $unwind: "$applicantDetails" }
        ];

        application = await Application.aggregate(pipeline);
        application = application[0];


        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        unit_amount: application.scholarshipDetails.applicationFees + application.scholarshipDetails.serviceCharge,
                        product_data: {
                            name: application.scholarshipDetails.scholarshipName,
                        }
                    },
                    quantity: 1
                },
            ],
            customer_email: application.applicantEmail,
            metadata: {
                applicationId: application._id.toString(),
            },
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment_failed?session_id={CHECKOUT_SESSION_ID}`
        });

        res.status(200).json({ url: session.url, application });


    } catch (err) {
        console.dir(err);
        res.status(400).json({ error: err.message });
    }
}



const PaymentSuccess = async (req, res, next) => {

    console.log("payment success")

    try {
        const { session_id } = req.body;
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === "paid") {
            const applicationId = session.metadata.applicationId;
            const updation = {
                paymentStatus: "paid",
                transId: session.payment_intent,
                applicationDate: new Date()
            }



            const updatedApplication = await Application.findByIdAndUpdate(
                new Types.ObjectId(applicationId),
                {
                    $set: { ...updation }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );


            res.status(200).json({ application: updatedApplication })
        }
        else res.status(200).json({
            status: session.status
        })
        next()
    } catch (err) {
        console.dir(err.message)
        res.status(400).json({ error: err.message })
    }
}



const FetchApplicationsByUser = async (req, res, next) => {

    try {

        let pipeline = [
            { $match: { applicantEmail: req.user_email } },
            {
                $lookup: {
                    from: "scholarships",
                    localField: "scholarshipId",
                    foreignField: "_id",
                    as: "scholarshipDetails"
                }
            },
            { $unwind: "$scholarshipDetails" },
            { $sort: { applicationDate: -1 } }
        ];


        let applications = await Application.find({ applicantEmail: req.user_email }).sort({ applicationDate: -1 });
        applications = await Application.aggregate(pipeline);
        console.log(applications);
        res.status(200).json({ applications });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const FetchApplicationsByModerator = async (req, res, next) => {

    try {

        let pipeline = [
            // Convert scholarshipId to ObjectId
            {
                $addFields: {
                    scholarshipIdObj: { $toObjectId: "$scholarshipId" }
                }
            },

            {
                $lookup: {
                    from: "scholarships",
                    localField: "scholarshipIdObj",
                    foreignField: "_id",
                    as: "scholarshipDetails"
                }
            },

            { $unwind: "$scholarshipDetails" },
            { $sort: { applicationDate: -1 } }
        ];


        //applications = await Application.find({ applicantEmail: req.user_email }).sort({ applicationDate: -1 });
        let applications = await Application.aggregate(pipeline);
        //console.log(applications);
        res.status(200).json({ applications });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const FetchReviews = async (req, res, next) => {

    try {
        let pipeline = [

            {
                $lookup: {
                    from: "scholarships",
                    localField: "scholarshipId",
                    foreignField: "_id",
                    as: "scholarshipDetails"
                }
            },
            { $unwind: "$scholarshipDetails" },
            { $sort: { date: -1 } }
        ];

        let reviews = await Review.aggregate(pipeline);
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const MyReviews = async (req, res, next) => {
    try {
        let pipeline = [
            { $match: { reviewerEmail: req.user_email } },
            {
                $lookup: {
                    from: "scholarships",
                    localField: "scholarshipId",
                    foreignField: "_id",
                    as: "scholarshipDetails"
                }
            },
            { $unwind: "$scholarshipDetails" },
            { $sort: { date: -1 } }
        ];

        let reviews = await Review.aggregate(pipeline);
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const AddReview = async (req, res, next) => {
    try {
        let review = { ...req.body };
        let reviewer = await User.findOne({ username: req.user_email });
        if (!reviewer) throw Error("No such user");
        review.reviewerName = reviewer.name;
        review.reviewerEmail = reviewer.username;
        review.reviewerImage = reviewer.photo;
        review.date = new Date();
        review = Review(review);
        await review.save();
        res.status(201).json({ message: "Review added", review });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const UpdateReview = async (req, res, next) => {
    try {
        let { _id } = req.body;
        let updation = { ...req.body, date: new Date() }
        let review = await Review.findByIdAndUpdate(
            _id,
            { $set: updation },
            { new: true, runValidators: true }
        )

        await review.save();
        res.status(201).json({ message: "Review added", review });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const RemoveReview = async (req, res, next) => {
    try {
        let { _id } = req.body;
        let review = await Review.findOne({
            _id
        });
        if (!review) throw Error("No such review");
        let requester = await User.findOne({ username: req.user_email });
        console.log(review.reviewerEmail, req.user_email, requester.role);
        if (review.reviewerEmail !== req.user_email && requester.role !== 'moderator') throw Error("Unauthorized to delete this review");

        await Review.deleteOne({ _id });
        res.status(200).json({ message: "Review removed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const ModeratorDecisionOnApplication = async (req, res, next) => {
    try {
        let { _id, approve } = req.body;
        let application = await Application.findOne({ _id });
        if (!application) throw Error("No such application");

        application.applicationStatus = approve;

        await application.save();
        res.status(200).json({ message: "Application updated", application });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const ModeratorFeedback = async (req, res, next) => {
    try {
        let { applicationId, feedback } = req.body;
        let application = await Application.findOne({ _id: applicationId });
        if (!application) throw Error("No such application");
        application.feedback = feedback;
        application = await application.save();
        res.status(200).json({ message: "Feedback added", application });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const DeleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const application = await Application.findOne({ _id: id, applicantEmail: req.user_email });
        if (!application) throw Error("No such application or you are not authorized to delete it");
        let requester = await User.findOne({ username: req.user_email })
        if (application.applicantEmail !== req.user_email || application.applicationStatus !== 'pending')
            throw Error('Unauthorized Action')

        await Application.deleteOne({ _id: id });
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const UpdateApplication = async (req, res, next) => {
    try {
        let { _id } = req.body;
        let updation = { ...req.body }
        let app = await Application.findByIdAndUpdate(
            _id,
            { $set: updation },
            { new: true, runValidators: true }
        );

        res.status(200).json({ application: app })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}





scholarshipRouter.post("/add", requireAuth, requireAdmin, AddScholarship);
scholarshipRouter.get("/all", FetchScholarships);
scholarshipRouter.get("/fetch/:id", requireAuth, FetchScholarshipById);
scholarshipRouter.post("/apply", requireAuth, Apply);
scholarshipRouter.patch("/application", requireAuth, UpdateApplication);
scholarshipRouter.delete("/application/:id", requireAuth, DeleteApplication)
scholarshipRouter.get("/my-applications", requireAuth, FetchApplicationsByUser);
scholarshipRouter.get("/applications", requireAuth, requireModerator, FetchApplicationsByModerator);
scholarshipRouter.get("/reviews", requireAuth, requireModerator, FetchReviews);
scholarshipRouter.get("/my-reviews", requireAuth, MyReviews);
scholarshipRouter.post("/add-review", requireAuth, AddReview);
scholarshipRouter.post("/update-review", requireAuth, UpdateReview);
scholarshipRouter.post("/remove-review", requireAuth, RemoveReview);
scholarshipRouter.post("/decision", requireAuth, requireModerator, ModeratorDecisionOnApplication);
scholarshipRouter.post("/feedback", requireAuth, requireModerator, ModeratorFeedback);
scholarshipRouter.post("/payment-success", requireAuth, PaymentSuccess);
scholarshipRouter.delete("/:id", requireAuth, requireAdmin, DeleteScholarship)
scholarshipRouter.put("/:id", requireAuth, requireAdmin, UpdateScholarship)