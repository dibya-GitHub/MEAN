const express = require('express');
const router = express.Router();
let expenseModel = require('../models/expense_collection.model');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');

router.route('/get_sum_expense').post((req, res) => {
	var myobj = {
		id: req.body.id,
	};
	var query = {
		_id: ObjectID.createFromHexString(myobj.id)
	};
	let sum = 0;
	expenseModel.find({
		"group_id": query._id
	}, (err, result) => {
		if (result) {
			const count = result.length;
			result.forEach((res) => {
				sum = sum + parseFloat(res.price);
			})
			res.json({
				status: "Success",
				statusCode: 200,
				result: sum,
				count: count
			});
		} else {
			console.log(err);
		}
	});
});

router.route('/delete_expense/:id').delete((req, res) => {
	var myobj = {
		id: req.params.id,
	};
	var query = {
		_id: ObjectID.createFromHexString(myobj.id)
	};
	expenseModel.deleteOne(query, (err, result) => {
		if (result) {
			res.json({
				status: "Success",
				statusCode: 200,
				statusText: "Deleted Successfully"
			});
		} else {
			console.log(err);
		}
	});
});
router.route('/create_expense').post((req, res) => {
	var myobj = {
		group_id: req.body.group_id,
		expense_description: req.body.expense_description,
		price: req.body.price,
		currency_code: req.body.currency_code,
		created_at: req.body.created_at,
		created_by: req.body.created_by,
		updated_at: req.body.updated_at,
		updated_by: req.body.updated_by
	};
	expenseModel.insertMany(myobj, (err, result) => {
		if (result) {
			res.json({
				status: "Success",
				statusCode: 200,
				result: "Expense Create Successfully"
			});
		} else {
			console.log(err);
		}
	});
});
router.route('/edit_expense').put((req, res) => {
	var myobj = {
		id: req.body._id,
	};
	var query = {
		_id: ObjectID.createFromHexString(myobj.id)
	};
	var myobj = {
		group_id: req.body.group_id,
		expense_description: req.body.expense_description,
		price: req.body.price,
		currency_code: req.body.currency_code,
		created_at: req.body.created_at,
		created_by: req.body.created_by,
		updated_at: req.body.updated_at,
		updated_by: req.body.updated_by
	};
	expenseModel.findByIdAndUpdate(query._id, myobj, (err, result) => {
		if (result) {
			res.json({
				status: "Success",
				statusCode: 200,
				result: "Expense Updated Successfully"
			});
		} else {
			console.log(err);
		}
	});
});

router.route('/get_expenses').post((req, res) => {
	var myobj = {
		id: req.body.id,
	};
	var query = {
		_id: ObjectID.createFromHexString(myobj.id)
	};
	expenseModel.find({
		"group_id": query._id
	}, (err, result) => {
		if (result) {
			res.json({
				status: "Success",
				statusCode: 200,
				result: result
			});
		} else {
			console.log(err);
		}
	});
});

router.route('/get_expenses/today').post((req, res) => {
	var myobj = {
		id: req.body.id,
	};
	var query = {
		_id: ObjectID.createFromHexString(myobj.id)
	};
	var dateTimeTofilter = moment().subtract(1, 'year');
	var filter = {
		"group_id": query._id,
		"created_at": {
			$gte: new Date(dateTimeTofilter._d)
		}
	};
	expenseModel.find(filter, (err, result) => {
		if (result) {
			res.json({
				status: "Success",
				statusCode: 200,
				result: result
			});
		} else {
			console.log(err);
		}
	});
});
router.route('/').get((req, res) => {
	res.send("Welcome to Expense");
});
module.exports = router;