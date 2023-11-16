// import { JSONSchemaType } from "ajv/dist/core";
// import { IOrderCustomerInformation } from "../interfaces/Order";

// import Joi from "joi";
// import { IOrderCustomerInformation } from "../interfaces/Order";

// // export const schema: JSONSchemaType<IOrderCustomerInformation> = {
// // 	properties: {
// // 		email: { type: "email", nullable: true },
// //         phoneNumber: { type: "phone" },

// // 	},
// //     type: "object",
// //     required: [],
// // 	additionalProperties: false,
// // };
// const sendOrderSchema = Joi.object<IOrderCustomerInformation>({
// 	firstName: Joi.string().required(),
// 	secondName: Joi.string().required(),
// 	email: Joi.string().email(),
// 	phoneNumber: Joi.().(),
// });

export default {};
