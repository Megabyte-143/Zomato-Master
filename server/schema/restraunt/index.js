import mongoose from "mongoose";

const RestrauntSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        mapLocation: { type: String, required: true },
        cuisine: [String],
        restrauntTimings: String,
        contactNumber: Number,
        website: String,
        popularDishes: [String],
        averageCost: Number,
        amenities: [String],
        menuImages: {
            type: mongoose.Types.ObjectId,
            ref: "Menus"
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Reviews"
            },
        ],
        photos: { type: mongoose.Types.ObjectId, ref: "Images" },
    },
    {
        timestamps: true
    }
);

export const RestrauntModel = mongoose.model("Restraunts", RestrauntSchema);