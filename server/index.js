const express = require('./node_modules/express')
const app = express()
const port = 6000

const bodyParser = require('./node_modules/body-parser')
const cookieParser = require('./node_modules/cookie-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const config = require('./config/key')
const mongoose = require('./node_modules/mongoose')
const jwt = require('./node_modules/jsonwebtoken')
mongoose.connect(config.mongoURI, { dbName: 'todoDB' })
	.then(() => console.log("MongoDB Connected ..."))
	.catch(err => console.log("Error : MongoDB Connecting"))

const { Todo } = require('./models/Todo')
const { User } = require('./models/User')

app.get('/', (req, res) => {
  	res.send('This is Node.js Server with Express includes MongoDB :D')
})

app.get('/favicon.ico', (req, res) => res.status(204))

// ---------------------Todo Route---------------------

app.get('/api/todos/get_todo', (req, res) => {
	Todo.find({}, (err, todoDatas) => {
		return res.send(todoDatas)
	})
})

app.post('/api/todos/del_todo', (req, res) => {
	Todo.deleteOne({ id: req.body.id }, (err) => {
		if(err) return res.json({ DeleteSuccess: false, err})
		return res.status(203).json({ DeleteSuccess: true })
	})
})

app.post('/api/todos/toggle_todo', (req, res) => {
	Todo.findOneAndUpdate({ id: req.body.id }, { done: !req.body.done }, (err) => {
		if(err) return res.json({ toggleSuccess: false, err })
		return res.status(204).json({ toggleSuccess: true })
	})
})

app.post('/api/todos/post_todo', (req, res) => {
	const todo = new Todo(req.body)
	todo.save((err, info) => {
		if(err) return res.json({ postSuccess: false, err })
		return res.status(200).json({ postSuccess: true })
	})
})

// ---------------------User Route---------------------

app.post('/api/users/get_name', (req, res) => {
	User.findByToken(req.body.login_token, (err, user) => {
		if(err) return res.json({ err })
		if(!user) return res.json({ userFindByToken: false })
		return res.json({ user })
	})
})

app.get('/api/users/decode', (req, res) => {
	jwt.verify(req.cookies.login_token, '1234', (err, decoded) => {
		return res.json({ decoded: decoded })
	})
})

app.get('/api/users/get_name', (req, res) => {
	const token = req.cookies.login_token
	User.findByToken(token, (err, user) => {
		if(err) return res.json({ err })
		if(!user) return res.json({ userFindByToken: false })
		return res.json({ user })
	})
})

app.post('/api/users/login', (req, res) => {
	
	User.findOne({ userName: req.body.userName }, (err, user) => {
		if(user === null) {
			const newUser = new User(req.body)
			newUser.save((err, user) => {
				if(err) return res.json({ loginSuccess: false, err })
				user.gerToken(( err, user ) => {
        			if (err) return res.status(400).send(err)
        			res.cookie("login_token", user.token).status(201).json({ loginSuccess: true, user: req.body.name })
      			})
			})
		} else {
			user.comparePassword(req.body.password, ( err, isMatch ) => {
      			if ( !isMatch ) return res.json({ loginSuccess: false, message: "Wrong password."})
      			user.gerToken(( err, user ) => {
        			if (err) return res.status(400).send(err)
        			res.cookie("login_token", user.token).status(202).json({ loginSuccess: true, user: req.body.name })
      			})
    		})
		}
	})
})

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})