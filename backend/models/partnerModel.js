import mongoose from "mongoose";

// Adding a mongoose schema for contacts, so that if we want to store them as a seperate collection in MongoDB
const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const contactModel = mongoose.model("Contact", contactSchema)

// Adds a mongoose schema for creating a partner, so that we know data only comes in these forms in the database
const partnerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        skill: {
            type: String,
            required: true,
        },
        partnerYear: {
            type: Number,
            required: true,
        },
        contact: {
            type: Object,
        }
    },
    {
        timestamps: true,
    }
);

export const Partner = mongoose.model('Partner', partnerSchema);