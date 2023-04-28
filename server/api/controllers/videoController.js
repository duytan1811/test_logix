const {
  isEmpty
} = require('lodash');

const utils = require('../libs/utils');
const mongoose = require('mongoose');
const Video = mongoose.model('Video');
const globalConstants = require('../../constants/global-constants');

const search = async (req, res) => {
  const {
    paginator,
  } = req.body;
  const condition = {};

  const videos = await Video
    .aggregate()
    .match(condition)
    .sort({
      createdAt: -1,
    })
    .skip(paginator.page * paginator.pageSize)
    .limit(paginator.pageSize)
    .allowDiskUse(true)
    .exec();

  const count = await Video.countDocuments(condition);

  await res.status(200).json({
    type: globalConstants.RESPONSE_TYPE.SUCCESS,
    data: videos,
    total: count
  });
}

const update = async (req, res) => {
	const video = req.body;
	const id = req.params._id;
	const existsVideo = await Video
		.findOne({
			_id: id
		})
		.exec();

	if (existsVideo == null) {
		throw Object.create({
			type: 'error',
			message: `This video id: ${req.params._id} not found`
		});
	}

  if(video.like){
    existsVideo.like+=1;
  }
  if(video.dislike){
    existsVideo.dislike+=1;
  }

	const updatedVideo = await Video
		.updateOne(req.params, existsVideo, {
			new: true
		})
		.exec();
	await res.status(200).json({
		type: globalConstants.RESPONSE_TYPE.SUCCESS,
		data: updatedVideo
	});
};

module.exports = utils.warpAsyncFunc({
  search,
  update,
});