import express from "express"
import { Scholarship, Application, Review } from "./model.js"
import { requireAdmin, requireAuth, requireModerator } from "../auth/middlewire.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://localhost:5173'; // put in env
import crypto from "crypto";
import { User } from "../auth/model.js";

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

const FetchScholarships = async (req, res, next) => {
    try {
        const scholarships = await Scholarship.find({}).sort({ postedAt: -1 }); // latest first
        res.status(200).json({ scholarships });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

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

        let paymentInfo = req.body;

        let scholarship = await Scholarship.findOne({ _id: paymentInfo.scholarshipId });
        if (!scholarship) throw Error("No such scholarship");

        let applicant = await User.findOne({ username: req.user_email });
        if (!applicant) throw Error("No such user");

        let application = {
            scholarshipId: scholarship._id.toString(),
            applicantId: applicant._id.toString(),
            applicantName: applicant.name,
            applicantEmail: applicant.username,
            applicationDate: new Date(),
            feedback: ""
        }

        application = Application(application);
        await application.save();

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        unit_amount: paymentInfo.cost,
                        product_data: {
                            name: paymentInfo.scholarshipName,
                        }
                    },
                    quantity: 1
                },
            ],
            customer_email: paymentInfo.email,
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

const FetchApplicationsByUser = async (req, res, next) => {

    try {

        let pipeline = [
            { $match: { applicantEmail: req.user_email } },

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
        let reviews = await Review.find({}).sort({ _id: -1 });
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const MyReviews = async (req, res, next) => {
    try {
        let reviews = await Review.find({ reviewerEmail: req.user_email }).sort({ date: -1 });
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const AddReview = async (req, res, next) => {
    try {
        let review = { ...req.body };
        let reviewer  = await User.findOne({ username: req.user_email });
        if( !reviewer ) throw Error("No such user");
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


const RemoveReview = async (req, res, next) => {
    try {
        let { reviewId } = req.body;
        let review = await Review.findOne({
            _id: reviewId
        });
        if (!review) throw Error("No such review");
        await Review.deleteOne({ _id: reviewId });
        res.status(200).json({ message: "Review removed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const ModeratorDecisionOnApplication = async (req, res, next) => {
    try {
        let { applicationId, approve } = req.body;
        let application = await Application.findOne({ _id: applicationId });
        if (!application) throw Error("No such application");

        application.applicationStatus = approve ? "approved" : "rejected";

        application = await application.save();
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




scholarshipRouter.post("/add", requireAuth, requireAdmin, AddScholarship);
scholarshipRouter.get("/all", FetchScholarships);
scholarshipRouter.get("/fetch/:id", requireAuth, FetchScholarshipById);
scholarshipRouter.post("/apply", requireAuth, Apply);
scholarshipRouter.get("/my-applications", requireAuth, FetchApplicationsByUser);
scholarshipRouter.get("/applications", requireAuth, requireModerator, FetchApplicationsByModerator);
scholarshipRouter.get("/reviews", requireAuth, requireModerator, FetchReviews);
scholarshipRouter.get("/my-reviews", requireAuth, MyReviews);
scholarshipRouter.post("/add-review", requireAuth, AddReview);
scholarshipRouter.post("/remove-review", requireAuth, requireModerator, RemoveReview);
scholarshipRouter.post("/decision", requireAuth, requireModerator, ModeratorDecisionOnApplication);
scholarshipRouter.post("/feedback", requireAuth, requireModerator, ModeratorFeedback);


