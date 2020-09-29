import CALENDAR from './calendar.js'

class Calendar {
	constructor({
		limitFlag,
		date,
		selected,
		startDate,
		endDate
	} = {}) {
		this.limitFlag = limitFlag;
		// 当前日期
		this.date = this.getDate(date) // 当前初入日期
		// 限定时间
		this.selected = selected || [];
		// 范围开始
		this.startDate = startDate
		// 范围结束
		this.endDate = endDate
		// 多选状态
		this.multipleStatus = {
			before: '',
			after: '',
			data: []
		}
		// 每周日期
		this.weeks = {}

		this._getWeek(this.date.fullDate)
	}

	/**
	 * 获取任意时间
	 */
	getDate(date, AddDayCount = 0, str = 'day') {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
		switch (str) {
			case 'day':
				dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
				break
			case 'month':
				if (dd.getDate() === 31) {
					dd.setDate(dd.getDate() + AddDayCount)
				} else {
					dd.setMonth(dd.getMonth() + AddDayCount) // 获取AddDayCount天后的日期
				}
				break
			case 'year':
				dd.setFullYear(dd.getFullYear() + AddDayCount) // 获取AddDayCount天后的日期
				break
		}
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}


	/**
	 * 获取上月剩余天数
	 */
	_getLastMonthDays(firstDay, full) {
		let dateArr = []
		let star = this.startDate.split('-')
		// console.log(star)
		for (let i = firstDay; i > 0; i--) {
			
			const beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate()
			let ful = full.year + "-" + ((Number(full.month) - 1) >= 10 ? (Number(full.month) - 1) : '0' + (Number(full.month) - 1) ) + "-" + beforeDate
			let disable = true
			if(Number(full.year) == Number(star[0])) {
				if(Number(full.month) - 1 == Number(star[1]) && beforeDate >= Number(star[2])) {
					disable = false
				}
			} else {
				disable = true
			}
			// if( Number(this.date.year) == Number(full.year) ) {
			// 	if( Number(this.date.month) > (Number(full.month) - 1) ) {
			// 		disable = true
			// 	} else if( Number(this.date.month) == (Number(full.month) - 1) ) {
			// 		if( i < Number(this.date.date) ) {
			// 			disable = true
			// 		} else {
			// 			disable = false
			// 		}
			// 	} else {
			// 		disable = false
			// 	}
			// }
			// if( Number(this.date.year) > Number(full.year) ) {
			// 	disable = true
			// }
			// if( Number(this.date.year) < Number(full.year) ) {
			// 	disable = false
			// }
			
			dateArr.push({
				fullDate: ful,
				date: beforeDate,
				year: full.year,
				month: full.month - 1,
				lunar: this.getlunar(full.year, full.month - 1, beforeDate),
				disable: disable
			})
		}
		return dateArr
	}
	/**
	 * 获取本月天数
	 */
	_currentMonthDys(dateData, full) {
		let dateArr = []
		let fullDate = this.date.fullDate
		for (let i = 1; i <= dateData; i++) {
			let isinfo = false
			let nowDate = full.year + '-' + (full.month < 10 ?
				full.month : full.month) + '-' + (i < 10 ?
				'0' + i : i)
			// 是否今天
			let isDay = fullDate === nowDate
			
			let _flag = true;
			let info = null;
			if(this.limitFlag){
				// 获取限定信息
				info = this.selected && this.selected.find((item) => {
					if (this.dateEqual(nowDate, item.date)) {
						return item
					}
				})
				if(info){
					_flag = false;
				}
			}else{
				if(this.dateMore(nowDate, this.startDate) && this.dateLess(nowDate, this.endDate)){
					_flag = false;
				}
			}
			
			// 日期禁用
			let disableBefore = true
			let disableAfter = true

			let multiples = this.multipleStatus.data
			let checked = false
			let multiplesStatus = -1

			let data = {
				fullDate: nowDate,
				year: full.year,
				date: i,
				month: full.month,
				lunar: this.getlunar(full.year, full.month, i),
				disable: _flag,
				//disable: !disableBefore || !disableAfter,
				isDay
			}
			if (info) {
				data.extraInfo = info
			}

			dateArr.push(data)
		}
		return dateArr
	}
	/**
	 * 获取下月天数
	 */
	_getNextMonthDays(surplus, full) {
		let dateArr = []
		// console.log(this.date)
		// console.log(full)
		// console.log(surplus)
		// console.log(this.endDate.split('-'))
		let end = this.endDate.split('-')
		// console.log(Number(this.date.month) , (Number(full.month) + 1))
		// console.log(Number(this.date.month) >= (Number(full.month) + 1)?"true":"false")
		for (let i = 1; i < surplus + 1; i++) {
			let ful = full.year + "-" + ((Number(full.month) + 1)>=10?(Number(full.month) + 1): "0" + (Number(full.month) + 1)) + "-" + (i < 10 ? '0' + i : i)
			
			let disable = true
			if(Number(full.year) == Number(end[0])) {
				if(Number(full.month) + 1 == Number(end[1]) && i <= Number(end[2])) {
					disable = false
				}
			} else {
				disable = true
			}
			
			// if( Number(this.date.year) == Number(full.year) ) {
			// 	if( Number(this.date.month) > (Number(full.month) + 1) ) {
			// 		disable = true
			// 	} else if( Number(this.date.month) == (Number(full.month) + 1) ) {
			// 		if( i >= Number(this.date.date) ) {
			// 			disable = false
			// 		} else {
			// 			disable = true
			// 		}
			// 	} else {
			// 		disable = false
			// 	}
			// }
			// if( Number(this.date.year) > Number(full.year) ) {
			// 	disable = true
			// }
			// if( Number(this.date.year) < Number(full.year) ) {
			// 	disable = false
			// }
			
			dateArr.push({
				fullDate: ful,
				year: full.year,
				date: i < 10 ? '0' + i : i,
				month: (Number(full.month) + 1).toString(),
				lunar: this.getlunar(full.year, Number(full.month) + 1, i),
				disable: disable
			})
		}
		return dateArr
	}
	/**
	 * 设置日期
	 * @param {Object} date
	 */
	setDate(date) {
		this._getWeek(date)
	}
	/**
	 * 获取当前日期详情
	 * @param {Object} date
	 */
	getInfo(date) {
		if (!date) {
			date = new Date()
		}
		const dateInfo = this.canlender.find(item => item.fullDate === this.getDate(date).fullDate)
		return dateInfo
	}

	/**
	 * 比较时间大小
	 */
	dateCompare(startDate, endDate) {
		// 计算截止时间
		startDate = new Date(startDate.replace('-', '/').replace('-', '/'))
		// 计算详细项的截止时间
		endDate = new Date(endDate.replace('-', '/').replace('-', '/'))
		if (startDate <= endDate) {
			return true
		} else {
			return false
		}
	}

	/**
	 * 比较时间是否相等
	 */
	dateEqual(before, after) {
		// 计算截止时间
		before = new Date(before.replace('-', '/').replace('-', '/'))
		// 计算详细项的截止时间
		after = new Date(after.replace('-', '/').replace('-', '/'))
		if (before.getTime() - after.getTime() === 0) {
			return true
		} else {
			return false
		}
	}
	
	/**
	 * 比较时间是否大于
	 */
	dateMore(before, after) {
		// 计算截止时间
		before = new Date(before.replace('-', '/').replace('-', '/'))
		// 计算详细项的截止时间
		after = new Date(after.replace('-', '/').replace('-', '/'))
		if (before.getTime() - after.getTime() >= 0) {
			return true
		} else {
			return false
		}
	}
	
	/**
	 * 比较时间是否小于
	 */
	dateLess(before, after) {
		// 计算截止时间
		before = new Date(before.replace('-', '/').replace('-', '/'))
		// 计算详细项的截止时间
		after = new Date(after.replace('-', '/').replace('-', '/'))
		if (before.getTime() - after.getTime() <= 0) {
			return true
		} else {
			return false
		}
	}


	/**
	 * 获取日期范围内所有日期
	 * @param {Object} begin
	 * @param {Object} end
	 */
	geDateAll(begin, end) {
		var arr = []
		var ab = begin.split('-')
		var ae = end.split('-')
		var db = new Date()
		db.setFullYear(ab[0], ab[1] - 1, ab[2])
		var de = new Date()
		de.setFullYear(ae[0], ae[1] - 1, ae[2])
		var unixDb = db.getTime() - 24 * 60 * 60 * 1000
		var unixDe = de.getTime() - 24 * 60 * 60 * 1000
		for (var k = unixDb; k <= unixDe;) {
			k = k + 24 * 60 * 60 * 1000
			arr.push(this.getDate(new Date(parseInt(k))).fullDate)
		}
		return arr
	}
	/**
	 * 计算阴历日期显示
	 */
	getlunar(year, month, date) {
		return CALENDAR.solar2lunar(year, month, date)
	}
	/**
	 * 设置打点
	 */
	setSelectInfo(data, value) {
		this.selected = value
		this._getWeek(data)
	}

	/**
	 *  获取多选状态
	 */
	setMultiple(fullDate) {
		let {
			before,
			after
		} = this.multipleStatus
		if (before && after) {
			this.multipleStatus.before = ''
			this.multipleStatus.after = ''
			this.multipleStatus.data = []
			this._getWeek(fullDate)
		} else {
			if (!before) {
				this.multipleStatus.before = fullDate
			} else {
				this.multipleStatus.after = fullDate
				if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
					this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
				} else {
					this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
				}
				this._getWeek(fullDate)
			}
		}
	}

	/**
	 * 获取每周数据
	 * @param {Object} dateData
	 */
	_getWeek(dateData) {
		const {
			fullDate,
			year,
			month,
			date,
			day
		} = this.getDate(dateData)
		let firstDay = new Date(year, month - 1, 1).getDay()
		let currentDay = new Date(year, month, 0).getDate()
		let dates = {
			lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
			currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
			nextMonthDays: [], // 下个月开始几天
			weeks: []
		}
		let canlender = []
		const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length)
		dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData))
		canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays)
		let weeks = {}
		// 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
		for (let i = 0; i < canlender.length; i++) {
			if (i % 7 === 0) {
				weeks[parseInt(i / 7)] = new Array(7)
			}
			weeks[parseInt(i / 7)][i % 7] = canlender[i]
		}
		this.canlender = canlender
		this.weeks = weeks
	}

	//静态方法
	// static init(date) {
	// 	if (!this.instance) {
	// 		this.instance = new Calendar(date);
	// 	}
	// 	return this.instance;
	// }
}


export default Calendar
