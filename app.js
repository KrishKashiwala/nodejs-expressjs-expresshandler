const express = require('express')
const app = express();
const  exphbs  = require('express-handlebars');
const path = require('path')
const members = require('./routes/api/members')
const logger = require('./middleware/logger')
const PORT  = process.env.PORT || 5000;

// handlebars middleware
app.engine('handlebars',exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

// home page.
app.get('/' , (req , res) => {
    res.render('index' , {
        title :'Member App',
        members
    })
})
// console.log(logger)
// app.use(logger)
app.use(express.static(path.join(__dirname, 'public')))

// body parser using create middleware.
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// members api routes
app.use('/api/members' , require('./routes/api/main'))

app.listen(PORT , () => console.log(`server is running on ${PORT}`))
// app.get('/api/members/:id' , (req, res) => {
//     res.json(members.filter(member => member.id === parseInt(req.params.id)))
// })
// app.get('/api/members' , (req, res) => {
//     res.json(members , null ,2)
// })