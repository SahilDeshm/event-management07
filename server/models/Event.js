import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    profiles: {
        type: [String],
        required: true,
    },
    startTimeUTC: {
        type: Date,
        required: true,
    },
    endTimeUTC: {
        type: Date,
        required: true,
    },
    createdAtUTC: {
        type: Date,
        default: Date.now,
    },
    updatedAtUTC: {
        type: Date,
        default: Date.now,
    },
       logs: [
        {
            message: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
});
export const Event = mongoose.model("Event" , eventSchema);