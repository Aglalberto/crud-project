const express = require('express')
const app = express()

const mysql = require('mysql')

const bodyParser = require('body-parser')

const path = require('path')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
})

db.connect( err => {
    if (err) {
        throw err
    }
    console.log('Conectado ao banco com sucesso!')
})

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get('/add_product', (req,res) => {
    res.render('add_product')
})

app.post('/add_product') //setup mysql

app.get('/products', (req,res) => {
    //setup mysql
    res.render('list_products') //setup objeto
})

app.listen(3000, () => {
    console.log('Server is running.')
})