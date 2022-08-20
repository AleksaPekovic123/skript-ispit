import JoiValid from "joi";
import JoiDate from "@joi/date";
import mongoose from "mongoose";

const Joi = JoiValid.extend(JoiDate);

const movie = mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  duration: { type: Number, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },
  rating: { type: Number, default: 0.0 },
  reviewCount: { type: Number, default: 0 },
  likeCount: {type: Number, default: 0},
  imageUrl: { type: String, required: true },
});

movie.methods.valid = async function (movieInfo, update) {
  const schema = !update
    ? Joi.object().keys({
        title: Joi.string().min(1).required(),
        releaseDate: Joi.date().format("DD/MM/YYYY").required(),
        duration: Joi.number().integer().min(1).required(),
        director: Joi.string().min(1).required(),
        cast: Joi.array().items(Joi.string()).required(),
        imageUrl: Joi.string().min(5).required(),
      })
    : Joi.object().keys({
        title: Joi.string().min(1),
        releaseDate: Joi.date().format("DD/MM/YYYY"),
        duration: Joi.number().integer().min(1),
        director: Joi.string().min(1),
        cast: Joi.array().items(Joi.string()),
        imageUrl: Joi.string().min(5),
      });
  const validate = schema.validate(movieInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);
  const existingmovie = await Movie.findOne({
    title: movieInfo.title,
    releaseDate: movieInfo.releaseDate,
    director: movieInfo.director,
  });
  if (existingmovie) throw new Error("Movie already exists");
};

movie.methods.validUpdate = async function (updateInfo) {
  const schema = Joi.object().keys({
    title: Joi.string().min(1),
    releaseDate: Joi.date().format("DD/MM/YYYY"),
    duration: Joi.number().integer().min(1),
    director: Joi.string().min(1),
    cast: Joi.array().items(Joi.string()),
    imageUrl: Joi.string().min(5).required(),
  });
};

const Movie = mongoose.model("Movie", movie);

export default Movie;
