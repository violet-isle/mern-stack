import mongoose from "mongoose";


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