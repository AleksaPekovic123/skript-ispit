import JoiValid from 'joi';
import JoiDate from '@joi/date';
import mongoose from 'mongoose';

const Joi = JoiValid.extend(JoiDate);

const song = mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  duration: { type: Number, required: true },
  artist: { type: String, required: true },
  featuredArtists: { type: [String], required: false },
  rating: { type: Number, default: 0.0 },
  reviewCount: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
});

song.methods.valid = async function (songInfo, update) {
  const schema = !update
    ? Joi.object().keys({
        title: Joi.string().min(1).required(),
        releaseDate: Joi.date().format('DD/MM/YYYY').required(),
        duration: Joi.number().integer().min(1).required(),
        artist: Joi.string().min(1).required(),
        featuredArtists: Joi.array().items(Joi.string()),
        imageUrl: Joi.string().required(),
        videoUrl: Joi.string().required(),
      })
    : Joi.object().keys({
        title: Joi.string().min(1),
        releaseDate: Joi.date().format('DD/MM/YYYY'),
        duration: Joi.number().integer().min(1),
        artist: Joi.string().min(1),
        featuredArtists: Joi.array().items(Joi.string()),
        imageUrl: Joi.string(),
        videoUrl: Joi.string(),
      });
  const validate = schema.validate(songInfo);
  if (validate.error) throw new Error(validate.error.details[0].message);

  const existingsong = await Song.findOne({
    title: songInfo.title,
    releaseDate: songInfo.releaseDate,
    artist: songInfo.artist,
  });
  if (existingsong) throw new Error('Song already exists');
};

const Song = mongoose.model('Song', song);

export default Song;
