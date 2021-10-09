import joi from "joi";

export const ValidateId = (Id) => {

    const Schema = joi.object({
        _id: joi.string().required(),
    });

    return Schema.validateAsync(Id);
};