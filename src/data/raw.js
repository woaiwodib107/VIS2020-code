const randomData = () => {
	const groupNum = 10
	const userNum = 10
	const gendar = ['male', 'female']
	let groupArr = []
	for (let i = 0; i < groupNum; i++) {
		let users = []
		for (let j = 0; j < userNum; j++) {
			let user = {}
			user['gendar'] = gendar[Math.round(Math.random())] // 0,1随机
			user['age'] = (Math.floor(Math.random() * 10) + 1) * 10
			user['salary'] = (Math.floor(Math.random() * 10) + 1) * 1000
			users.push(user)
		}
		groupArr.push(users)
	}
	console.log(groupArr)
	return groupArr
}
export { randomData }
