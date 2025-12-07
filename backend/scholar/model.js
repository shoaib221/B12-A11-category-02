import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
//   scholarshipCategory (Full fund/Partial/Self-fund), degree (Diploma/Bachelor/Masters), tuitionFees (optional), applicationFees, 
// serviceCharge, applicationDeadline, scholarshipPostDate, postedUserEmail.
const ScholarshipSchema = new mongoose.Schema({
    
    scholarshipName: {
        type: String,
        required: true,
    },
    universityName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    worldRank: {
        type: Number
    },
    scholarshipCategory: {
        type: String,
        required: true
    },
    subjectCategory: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    tuitionFees: {
        type: Number
    },
    applicationFees: {
        type: Number,
        required: true
    },
    serviceCharge: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    postedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    postedBy: {
        type: String,
        required: true
    }


    
});

ScholarshipSchema.index({ scholarshipName: 1, universityName: 1  }, { unique: true });   

export const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

//Stores application data: scholarshipId, userId, userName, userEmail, universityName, scholarshipCategory, degree, applicationFees, serviceCharge, applicationStatus (default: pending), paymentStatus (unpaid/paid), applicationDate, feedback (added by moderator).

const ApplicationSchema= mongoose.Schema({

    scholarshipId: {
        type: ObjectId,
        required: true
    },
    applicantId: {
        type: ObjectId,
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    applicantEmail: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: String,
        required: true,
        default: "pending"
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "unpaid"
    },
    applicationDate: {
        type: Date
    },
    feedback: {
        type: String
    }

})

export const Application = mongoose.model("Application", ApplicationSchema)

//Stores students review data: 

const ReviewSchema = mongoose.Schema({
    applicationId: {
        type: ObjectId,
        required: true
    },
    scholarshipId: {
        type: ObjectId,
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    reviewerEmail: {
        type: String,
        required: true
    },
    reviewerImage: {
        type: String,
    },
    rating: {
        type: Number
    }, 
    comment: {
        type: String
    }, 
    date: {
        type: Date
    }


})

export const Review = mongoose.model("Review", ReviewSchema)