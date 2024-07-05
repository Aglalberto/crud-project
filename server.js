const express = require('express')
const app = express()

const mysql = require('mysql')

const bodyParser = require('body-parser')

const path = require('path')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalogo_aula'
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

app.post('/add_product', (req,res) => {
    
    const { name, quantity, price } = req.body

    if (!name || !quantity || !price) {
        return res.status(400).send('Todos os campos são required.')
    }

    let sql = 'INSERT INTO products (nome, quantity, price) VALUES (?, ?, ?)'

    db.query(sql, [name, quantity, price], (err, result) => {
        if (err) {
            throw err
        }
        console.log('Product added')
        res.redirect('/products')
    })
})


app.get('/products', (req,res) => {
    let sql = 'SELECT * FROM products'

    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.render('list_products', { products: result })
    })
})

app.listen(3000, () => {
    console.log('Server is running.')
})