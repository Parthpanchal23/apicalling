import express from 'express'
const app = express();


app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            slug: "beauty",
            name: "Beauty",
            price: 320,
            url: "https://dummyjson.com/products/category/beauty"
        },
        {
            id: 2,
            slug: "fragrances",
            name: "Fragrances",
            price: 150,
            url: "https://dummyjson.com/products/category/fragrances"
        },
        {
            id: 3,
            slug: "furniture",
            name: "Furniture",
            price: 250,
            url: "https://dummyjson.com/products/category/furniture"
        },
        {
            id: 4,
            slug: "science",
            name: "Science",
            price: 600,
            url: "https://dummyjson.com/products/category/beauty"
        },
        {
            id: 5,
            slug: "dumble",
            name: "Dumble",
            price: 100,
            url: "https://dummyjson.com/products/category/fragrances"
        },
        {
            id: 6,
            slug: "flight",
            name: "Flight",
            price: 500,
            url: "https://dummyjson.com/products/category/furniture"
        },

    ]
    // https://localhost:3000/api/products?search=metal

    if (req?.query?.search) {
        const fillterProducts = products.filter(product => product.name.includes(req.query.search) || product.name.startsWith(req.query.search))
        res.send(fillterProducts)
        return;
    }
    if (req.query.id) {
        const fillterProducts = products.filter(product => product.id == req.query.id)
        res.send(fillterProducts)
        return;
    }
    setTimeout(() => {
        res.send(products)
    }, 3000)
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port${port}`)
})