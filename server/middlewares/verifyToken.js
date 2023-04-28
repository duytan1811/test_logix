require('dotenv').config();
const jwt = require('jsonwebtoken');
const globalConstants = require('../constants/global-constants');

module.exports = (request, response, next) => {
	const token = request.header('authorization');
	if (!token) return response.status(401).json({
		type: globalConstants.RESPONSE_TYPE.ERROR,
		message: 'Access Denied'
	});

	try {
		const { _id, exp } = jwt.verify(token, process.env.TOKEN_SECRET);

		if (exp < Date.now().valueOf() / 1000) {
			return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
		}
		next();
	} catch (err) {
		return response.status(400).json({
			type: globalConstants.RESPONSE_TYPE.ERROR,
			message: 'Invalid Token'
		});
	}
};