import JoiValid from "joi";
import JoiDate from "@joi/date";
import mongoose from "mongoose";

const Joi = JoiValid.extend(JoiDate);

import { BOOK_TYPES } from "../common/enums/bookTypes.js";

const book = mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  type: { type: String, required: true },
  author: { type: String, required: true },
  categories: { type: [String], required: true },
  rating: { type: Number, default: 0.0 },
  reviewCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
});

book.methods.valid = async function (bookInfo, update) {
  const schema = !update
    ? Joi.object().keys({
        title: Joi.string().min(1).required(),
        releaseDate: Joi.date().format("DD/MM/YYYY").required(),
        type: Joi.string().min(1).required(),
        author: Joi.string().min(1).required(),
        categories: Joi.array().items(Joi.string()).required(),
        imageUrl: Joi.string().required(),
      })
    : Joi.object().keys({
        title: Joi.string().min(1),
        releaseDate: Joi.date().format("DD/MM/YYYY"),
        type: Joi.string().min(1),
        author: Joi.string().min(1),
        categories: Joi.array().items(Joi.string()),
        imageUrl: Joi.string(),
      });
  const validate = schema.validate(bookInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
  if (!BOOK_TYPES.includes(bookInfo.type)) throw new Error("Invalid book type");
  const existingbook = await Book.findOne({
    title: bookInfo.title,
    releaseDate: bookInfo.releaseDate,
    author: bookInfo.director,
  });
  if (existingbook) throw new Error("book already exists");
};

const Book = mongoose.model("Book", book);

export default Book;
