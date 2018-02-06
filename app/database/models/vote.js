/**
 * 投票表
 */
let mongoose = require('../db'),
    Schema = mongoose.Schema;
    
let voteSchema = new Schema({
    "title": {
        unique: true,
        type: String
    },
    "desc": {
        type: String,
    },
    "imgs": {
        type: [String],
    },
    "type":{
        type:int,
    },
    "select_max":{
        type:int,
    },
    "img_type":{
        type:int,
    },
    "select":{
        type: [String],
    },
    "start_time":{
        type:int,
    },
    "end_time":{
        type:int,
    },
    "status":{
        type:int
    }
});

//每次创建都会调用这个方法
voteSchema.pre('save', function (next) {
	//判断是否是新的数据对象，更新创建|更新数据的时间
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next();
})