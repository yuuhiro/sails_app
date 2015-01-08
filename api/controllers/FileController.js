/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	* `FileController.create()`
	*/
	create: function (req, res) {
		var reqBody = req.body,
		fileObj = {image: reqBody.image};

		Poll.create(fileObj).exec(function(err, doc) {
			if(err || !doc)
			{
				res.serverError(err);
			}
			else
			{
				res.json(doc);
			}
		});
	}
};

