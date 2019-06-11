// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const CaseFileSchema = new Schema(
  {
    id: Number,
    firstName: String,
    lastName: String,
    lastName: String,
    parentDob: String,
    phoneNumber: String,
    parentGender: String,
    Ancestry: String,
    caseStatus: String,
    AttendedResidentialSchool: String,
    reasonForIntervention: String,
    referredBy: String,
    childWelfareInvolvement: String,
  },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", CaseFileSchema);
