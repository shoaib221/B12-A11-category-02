import mongoose from 'mongoose';
//   scholarshipCategory (Full fund/Partial/Self-fund), degree (Diploma/Bachelor/Masters), tuitionFees (optional), applicationFees, 
// serviceCharge, applicationDeadline, scholarshipPostDate, postedUserEmail.
const ScholarshipSchema = new mongoose.Schema({
    
    scholarshipName: {
        type: String,
        required: true,
        unique: true,
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
        type: Number
    },
    serviceCharge: {
        type: Number,
    },
    deadline: {
        type: Date
    },
    postedAt: {
        type: Date
    },
    postedBy: {
        type: String,
        required: true
    }


    
});

export const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

//Stores application data: scholarshipId, userId, userName, userEmail, universityName, scholarshipCategory, degree, applicationFees, serviceCharge, applicationStatus (default: pending), paymentStatus (unpaid/paid), applicationDate, feedback (added by moderator).

const ApplicationSchema= mongoose.Schema({

    scholarshipId: {
        type: String,
        required: true
    },
    applicantId: {
        type: String,
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
    scholarshipId: {
        type: String
    },
    universityName: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
    },
    ratingPoint: {
        type: Number
    }, 
    reviewComment: {
        type: String
    }, 
    reviewDate: {
        type: Date
    }


})

export const Review = mongoose.model("Review", ReviewSchema)