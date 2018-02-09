/**
 * 投票表
 */
let mongoose = require('../db'),
    Schema = mongoose.Schema;
  
let _underscore = require('underscore');

let bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const moment = require('moment');
let now = moment();

let voteSchema = new Schema({
    "vtitle": {
        unique: true,
        type: String
	},
	"name":{
		type: String
	},
	"phone": {		
		type: String
	},
    "vDesc": {
        type: String
    },
    "imgs": {
        type: [String]
    },
    "v_type":{
        type:Number,
        default:0
    },
    "select_max":{
        type:Number,
        default: 2
    },
    "img_type":{
        type:Number,
        default: 0
    },
    "sel_txt":{
        type: [String]
    },
    "sel_img":{
        type:[String]
    },
    "start_time":{
		type:String,
		default:now.format()
    },
    "end_time":{
        type:String
    },
    "status":{
        type:Number,
        default: 0
	},
	"meta": {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//每次创建都会调用这个方法
// voteSchema.pre('save', function (next) {
// 	//判断是否是新的数据对象，更新创建|更新数据的时间
// 	if (this.isNew) {
// 		this.meta.createAt = this.meta.updateAt = Date.now()
// 	} else {
// 		this.meta.updateAt = Date.now()
// 	}

// 	next();
// })

voteSchema.statimethodscs = {};

voteSchema.statics = {
	findVoteList: function (callback) {	
		this.find().sort({
			"_id": -1
		}).exec((err, voteList) => {
			if (err) {
				console.log(err);
			} else {
				callback(voteList);
			}
		});
	},
    addVote: function (vote, callback) {
		let newVote = {
			"vtitle": vote.vtitle,
			"name":vote.name || '',
			"phone":vote.phone || '',
			"vDesc": vote.vDesc || '',
			"imgs":vote.imgs || [''],
			"v_type": vote.v_type,
			"select_max": vote.select_max,
			"img_type":vote.img_type,
			"sel_txt":vote.sel_txt || [''],
			"sel_img":vote.sel_img || [''],
			"start_time":vote.start_time || '',
			"end_time":vote.end_time || '',
			"status":vote.status
		}
		this.create(newVote, (err) => {
			if (err) {
				callback({
					'status': "fail",
					'mes': err
				});
			} else {
				callback({
					'status': "success",
				});
			}
		});
	},
	delVote: function (attr,val, callback) {
		this.remove({
			[attr]:val
		}, function (err) {
			if (err) {
				callback({
					'status': "fail",
					'mes': err
				});
			} else {
				callback({
					'status': "success",
				});
			}
		})
	},
	updateVote: function (id, update, callback) {
		var _this = this;
		this.findOne({
			'_id': id
		}, function (err, oldVote) {
			if (err) {
				callback({
					'status': "fail",
					'mes': err
				});
			} else {
				let canReset = false;
				for (let attr in update) {
					if (update[attr] == oldVote[attr]) {
						canReset = false;
					} else {
						canReset = true;
						break;
					}
				}

				if (!canReset) {
					callback({
						'status': "fail",
						'mes': "信息重复。"
					});
					return false;
				}

				let newVote = _underscore.extend(oldVote, update);
				newVote.meta.updateAt = Date.now();

				_this.update({
					'_id': id
				}, newVote, {
					upsert: true
				}, function (error, data) {
					if (error) {
						callback({
							'status': "fail",
							'mes': '保存失败。'
						});
					} else {
						callback({
							'status': "success",
							'mes': newVote
						});
					}
				});
			}
		});
	},
}

module.exports = mongoose.model('vote', voteSchema);