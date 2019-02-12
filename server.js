const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const products ={
	list: [
		{
			id: 1,
			name: "Veg Burger",
			price: 55,
			stock: 20,
			reorder: 5
		},

		{
			id: 2,
			name: "Chicken Burger",
			price: 70,
			stock: 20,
			reorder: 5
		},

		{
			id: 3,
			name: "Veg Pizza",
			price: 70,
			stock: 20,
			reorder: 5
		},

		{
			id: 4,
			name: "Paneer Pizza",
			price: 100,
			stock: 20,
			reorder: 5
		},

		{
			id: 5,
			name: "Chicken Pizza",
			price: 120,
			stock: 20,
			reorder: 5
		},

		{
			id: 6,
			name: "French Fries",
			price: 30,
			stock: 20,
			reorder: 5
		},

		{
			id: 7,
			name: "Veg Roll",
			price: 50,
			stock: 20,
			reorder: 5
		},

		{
			id: 8,
			name: "Veg Sandwich",
			price: 25,
			stock: 20,
			reorder: 5
		},

		{
			id: 9,
			name: "Paneer Sandwich",
			price: 40,
			stock: 20,
			reorder: 5
		},

		{
			id: 10,
			name: "Chicken Sandwich",
			price: 70,
			stock: 20,
			reorder: 5
		},

		{
			id: 11,
			name: "Bombay Falooda",
			price: 90,
			stock: 20,
			reorder: 5
		},

		{
			id: 12,
			name: "Dry Fruit Falooda",
			price: 120,
			stock: 20,
			reorder: 5
		},

		{
			id: 13,
			name: "Vanilla Thickshake",
			price: 60,
			stock: 20,
			reorder: 5
		},

		{
			id: 14,
			name: "Mango Thickshake",
			price: 60,
			stock: 20,
			reorder: 5
		},

		{
			id: 15,
			name: "Paneer Tikka",
			price: 80,
			stock: 20,
			reorder: 5
		}

	]
}

app.get('/', (req, res)=> {
	res.send(products.list);
})

app.listen(3000, () => {
	console.log('app is running port 3000');
}) 