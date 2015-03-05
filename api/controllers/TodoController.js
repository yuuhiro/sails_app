/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	* `TodoController.create()`
	*/
	create: function (req, res) {
		var reqBody = req.body;
		var pollObj = {
			title: reqBody.title,
			content: reqBody.content
		};

		Todo.create(pollObj)
			.exec(function(err, doc) {
				if(err || !doc)
				{
					res.serverError(err);
				}
				else
				{
					res.json(doc);
				}
			});
	},
	/**
	* `TodoController.find()`
	*/
	find: function(req, res) {
		console.log("GET /message");
		var reqQuery = req.query;
		var sort = reqQuery.sort ? parseInt(reqQuery.sort) : 1;
		var limit = reqQuery.limit ? parseInt(reqQuery.limit) : 2;
		var skip = reqQuery.skip ? parseInt(reqQuery.skip) : 0;
		var nextSkip = limit + skip;

		console.log('reqQuery', limit, skip);
		var sortParam = null;
		switch (sort){
		case 1:
			sortParam = {updatedAt: 'desc'};
		break;
		case 2:
			sortParam = {updatedAt: 'asc'};
		break;
		}
		
		Todo.find()
			.sort(sortParam)
			.limit(limit)
			.skip(skip)
			.exec(function(err, todos) {
			var data = {
				todos: todos,
				skip: nextSkip
			};
			res.json(data);
		});
	},
	/**
	* `TodoController.findOne()`
	*/
	findOne: function(req, res) {
		console.log("GET /message");
		var reqQuery = req.query;
		var id = parseInt(reqQuery.id);

		Todo.findOne({id: id})
		.exec(function findOneCB(err, todo) {
			res.json(todo);
		});
	},
	/**
	* `TodoController.update()`
	*/
	update: function(req, res) {
		var reqBody = req.body;
		var id = reqBody.id;
		var pollObj = {
			title: reqBody.title,
			content: reqBody.content
		};
		Todo.update({id: id}, pollObj)
		.exec(function(err, doc) {
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

