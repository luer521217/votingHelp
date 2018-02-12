const express = require('express');
const router = express.Router();

const fs = require('fs');

let User = require('../database/models/user');
let Vote = require('../database/models/vote');


//const URL = 'D:/project/meetingHelp';
//初始化数据
//用户
// User.create({
// 	"name": 'user',
// 	"email": '719775348@qq.com',
// 	"phone": '17612908650',
// 	"password": '111111',
// 	"level": 0
// })
//多选文字投票
// Vote.create({
// 	"vtitle": '总结会3333',
// 	"name":'yanglu',
//     "phone":'17612908650',
// 	"vDesc": '总结一下按时打发ff阿萨德阿萨德',
// 	"imgs": '',
//  	"v_type": 1,
//  	"select_max": 2,
//  	"img_type": 0,
//  	"sel_txt":["777", "888","999"],
// 	"start_time": '2018-03-10 12:00:00',
// 	"end_time": '2018-03-12 12:00:00',
// 	"status": 0,
// });


// 获取账户信息
router.post('/getUserByAttr', function (req, res) {
	console.log(req.body);
	User.findUserByAttr(req.body.attr, req.body.val, (user) => {
		res.send(200, user);
	})

});

//获取投票列表
router.post('/getVoteList', function (req, res) {	
		
	Vote.findVoteList((voteList) => {
		res.send(200, {
			'voteList': voteList
		});
	})
});

// 发起投票
router.post('/addVote', function (req, res) {

	// if (!req.body.vtitle || !req.body.vDesc) {
	// 	res.send(200, {
	// 		mes: '参数错误。'
	// 	});
	// 	return false;
	// }
	console.log(req.body);

	Vote.addVote(req.body, (status) => {
		res.send(200, status);
	})

});
//查询投票
router.post('/findVoteByAttr',function(req,res){
	console.log(req.body);
	Vote.findVoteByAttr(req.body.attr,req.body.val,(status) =>{
		res.send(200,status);
	})
});

//删除投票
router.post('/delVote', function (req, res) {

	// if (!req.body.vtitle) {
	// 	res.send(200, {
	// 		mes: '参数错误。'
	// 	});
	// 	return false;
	// }
	console.log(req.body);

	Vote.delVote(req.body.attr,req.body.val, (status) => {
		res.send(200, status);
	})

});

//修改投票信息
router.post('/updateVote', function (req, res) {

	// if (!req.body.update.vDesc) {
	// 	res.send(200, {
	// 		mes: '参数错误。'
	// 	});
	// 	return false;
	// }
	console.log(req.body);

	Vote.updateVote(req.body._id, req.body.update, (status) => {
		res.send(200, status);
	})
});


module.exports = router;


