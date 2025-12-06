# DigiMart

A Full-Stack E-commerce web app where you can buy electronic products, along with features like filtering and sorting products | wishlist, cart and address management.

Built with React frontend, Express/Node backend and MongoDB database.

---

## Demo Link

[Live Demo](https://frontend-digi-mart.vercel.app/)

---

## Quick Start

```
git clone https://github.com/mayank-singh-12/frontend_DigiMart.git
cd frontend_DigiMart
npm install
npm run dev
```

---

## Technologies

- React
- React Router
- React-Toastify
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bootstrap
- CSS

---

## Demo Video

Watch a walkthrough (5-7 minutes) to walk through major features of this app:
[YouTube Video](https://drive.google.com/file/d/1kJVI3qB8SCSSHhrzAu9Xv7qdCuEE09uQ/view?usp=sharing)

---

## Features

**Home page**

- Lists all categories.
- Navigates Users to Products listing page with applied category filter.
- Shows Star Product.
- Shows Best Deal.

**Products listing page**

- Lists all the products.
- Provides Search to search products.
- Provides button to add product to Wishlist.
- Provides button to add product to Cart.
- Provides filters to filter the product.
- Navigates user to products detail page of selected product.

**Product detail page**

- Showcases details of product.
- Provides button to add product to Wishlist.
- Provides button to add product to Cart.
- Shows similar products that fall in same category.

**Wishlist**

- Lists all the Wishlisted products.
- Stored in Localstorage.
- Shows a message if no product is present.
- Provides button to add to cart.
- Provides button to remove from Wishlist.
- Increases quantity of product in cart, if duplicate product is being added.

**Cart**

- Lists all the products in Cart.
- Stored in Localstorage.
- User can increment or decrement product quantity.
- Shows a message if no product is present.
- Provides button to move to Wishlist.
- Provides button to remove from Cart.
- Shows price details with live calculation.

**Checkout page**

- Shows final bill.
- Provide add new address functionality to user.
- User can select address from listed addresses.

**Order Success Page**

- Shows success message on successful order.
- Provides a button to navigate to products listing page.

**Profile**

- Shows Details of user.
- Shows all the addresses.
- Shows past orders.

---

# API Reference

Link to Backend Repo:
[API Repo](https://github.com/mayank-singh-12/backend_DigiMart)

## Base API: https://backend-digi-mart.vercel.app/

### GET /products

List all products<br>
Sample Response:

```
[
    {
        _id : ...,
        title: ...,
        category: [ { _id: ..., name: ..., products: [...] }, ...],
        description: [...],
        price: ...,
        discount: ...,
        models: { storage: [...], color: [...], _id: ... },
        rating: ...,
        images: [...]
    }, ...
]
```

### GET /products/:productId

Get details of one product<br>
Sample Response:

```
{
    product: {
        _id : ...,
        title: ...,
        category: [ { _id: ..., name: ..., products: [...] }, ...],
        description: [...],
        price: ...,
        discount: ...,
        models: { storage: [...], color: [...], _id: ... },
        rating: ...,
        images: [...]
    }
}
```

### GET /categories

Get list of all categories<br>
Sample Response:

```
[
    {
        _id: ...,
        name: ...,
        products:[
            {
                _id : ...,
                title: ...,
                category: [ { _id: ..., name: ..., products: [...] }, ...],
                description: [...],
                price: ...,
                discount: ...,
                models: { storage: [...], color: [...], _id: ... },
                "rating": 4.6,
                "images": [...]
            }, ...
        ]
    }
]
```

### GET /categories/:categoryId

Get list of all categories<br>
Sample Response:

```
{
    category:{
        _id: ...,
        name: ...,
        products:[
            {
                _id : ...,
                title: ...,
                category: [ { _id: ..., name: ..., products: [...] }, ...],
                description: [...],
                price: ...,
                discount: ...,
                models: { storage: [...], color: [...], _id: ... },
                "rating": 4.6,
                "images": [...]
            }, ...
        ]
    }
}
```

### GET /orders/:categoryId

Get list of recent orders<br>
Sample Response:

```
{
    orders:[
        {
            _id: ...,
            products: [ { title: ..., quantity: ..., price: ..., discount: ..., discountedPrice: ... }, ... ],
            shippingAddress: {
                name: ...,
                houseNo: ...,
                streetAddress: ...,
                city: ...,
                state: ...,
                country: ...
            },
            subTotal: ...,
            delivery: ...,
            totalToPay: ...
        }
    ]
}
```
