const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const PORT = process.env.PORT;

var db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'ganga',
		password: '',
		database: 'biller'
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {

	db.select().from('products_arumai').then(list => {
		res.json(list);
	});
})
app.post('/billed', (req,res) => {
	const {items,total,date} = req.body;
	
	db.transaction(trx => {
		db.insert({
			date: date,
			total: total
		}).into('billhead')
		  .transacting(trx)
		  .returning('billno')
		  .then(billnum => {
		  	var billnu = billnum[0];
		  	let itemtoAdd = items.map(item => {

		  		db.select('*').from('products_arumai').where({name: item.name, inven: true}).decrement('stock', item.quantity).then(console.log(item.name))
		  		return {
		  			billno: billnum[0],
		  			productname: item.name,
		  			quantity: item.quantity,
		  			netprice: item.amount
		  		}
		  	})
		  	return trx('billdetails')
		  		.returning('*')
		  		.insert(itemtoAdd)
		  		.then(res.json({status: 'success', billno: billnum}))
		  })
		    .then(trx.commit)
	  		.catch(trx.rollback)
	})
})

app.get('/exp', (req, res) => {

	db.select().from('expenses').then(exp => {
		res.json(exp);
		console.log('check',exp);
	});
})

app.post('/addproduct', (req,res) => {
	const { name, price, inven, stock } = req.body;
	db.insert({
		name: name,
		price: price,
		inven: inven,
		stock: stock
	}).into('products_arumai').returning('*').then(prod => res.json(prod)).catch(err => res.json(err))
})

app.put('/inventory', (req,res) => {
	const { rname, stock} = req.body;

	db.select('*').from(products_arumai).where('name' === rname).update('stock', stock)
})

app.put('/billreturn', (req,res) => {
	console.log('billreturn');
})

app.get('/dash', (req,res) => {
	const dashProps = {
		salesToday: [],
		expenses: [],
	}

	db.select('*').from('billhead').where({date: new Date()})
		.then(salestoday => {
			console.log(salestoday);
		});
	db.select('*').from('products_arumai').then(samp => dashProps = {expenses: samp});

	res.json(dashProps.salesToday)
})

app.listen(3000, () => {
	console.log(`app is running port 3000`);
}) 