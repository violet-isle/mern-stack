import mongoose from "mongoose";

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
        }
    },
    {
        timestamps: true,
    }
);

export const Partner = mongoose.model('Partner', partnerSchema);