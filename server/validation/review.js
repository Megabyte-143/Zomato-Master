import joi from "joi";

export const ValidateReviewBody = (review) => {

    const Schema = joi.object({
        rating: joi.number().required(),
        reviewText: joi.string().required(),
    });

    return Schema.validateAsync(review);
};