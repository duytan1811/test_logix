const {
	isEmpty
} = require('lodash');

const utils = require('../libs/utils');
const mongoose = require('mongoose');
const Role = mongoose.model('Role');
const globalConstants = require('../../constants/global-constants');

const search = async (req, res) => {
	const {
		paginator,
		searchParams,
		sorting
	} = req.body;
	const queryAnd = {};
	const condition = {};

	if (!isEmpty(searchParams.code)) {
		queryAnd.code = {
			$regex: `^${searchParams.code}.*`,
			$options: 'i',
		}
	}

	if (!isEmpty(searchParams.name)) {
		queryAnd.name = {
			$regex: `^${searchParams.name}.*`,
			$options: 'i',
		}
	}

	if (!isEmpty(searchParams.status)) {
		queryAnd.status = {
			$eq: searchParams.status,
		}
	}

	if (!isEmpty(queryAnd)) {
		condition.$and = [queryAnd];
	}
	const categories = await Role
		.aggregate()
		.match(condition)
		.sort({
			createdAt: -1,
		})
		.skip(paginator.page * paginator.pageSize)
		.limit(paginator.pageSize)
		.allowDiskUse(true)
		.exec();

	const count = await Role.countDocuments(condition);

	await res.status(200).json({
		type: globalConstants.RESPONSE_TYPE.SUCCESS,
		data: categories,
		total: count
	});
}

const create = async (req, res) => {
	const resRole = await Role.create(req.body);
	await res.status(200).json({
		type: globalConstants.RESPONSE_TYPE.SUCCESS,
		key: globalConstants.MESSAGES.ROLE.CREATE_SUCCESS,
		data: resRole,
	});
};

const update = async (req, res) => {
	const role = req.body;
	const id = req.params._id;
	const existsRole = await Role
		.findOne({
			_id: id
		})
		.exec();

	if (existsRole == null) {
		throw Object.create({
			type: 'error',
			key: globalConstants.MESSAGES.ROLE.NOT_FOUND,
			message: `This role id: ${req.params._id} not found`
		});
	}

	const updatedRole = await Role
		.updateOne(req.params, role, {
			new: true
		})
		.exec();
	await res.status(200).json({
		type: globalConstants.RESPONSE_TYPE.SUCCESS,
		key: globalConstants.MESSAGES.ROLE.UPDATE_SUCCESS,
		data: updatedRole
	});
};

const destroy = async (req, res) => {
	const {
		_id
	} = req.params;
	const role = await Role
		.findOneAndDelete({
			_id
		}).exec();
	await res.status(200).json({
		type: globalConstants.RESPONSE_TYPE.SUCCESS,
		key: globalConstants.MESSAGES.ROLE.DELETE_SUCCESS,
		data: role
	});
};

module.exports = utils.warpAsyncFunc({
	search,
	create,
	update,
	destroy
});