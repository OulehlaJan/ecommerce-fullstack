<!-- Created by, animated text -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Noto+Sans&weight=600&size=32&duration=3300&pause=4800&color=79C0FF&center=true&vCenter=true&random=false&width=435&lines=%F0%9F%91%8B%2C+Created+by+%40OulehlaJan" />
</p>
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=noto&weight=600&size=22&duration=4000&pause=4350&color=FFA657&center=true&vCenter=true&random=false&width=910&lines=a+self-taught+passionate+Web+developer+from+Czechia" />
</p>

# :computer: Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/40c70173-088f-4486-af47-f2d5fb0a00f0/deploy-status)](https://app.netlify.com/sites/stylish-one/deploys) <br />

<!-- Demo Link -->
<h3 align="center">
  <a href="https://stylish-one.netlify.app">Ecommerce - Stylish One</a> :point_left: <br/> <br/>
</h3>

<!-- GIF -->
<p align="center">
  <img src="assets/StylishOne.gif" />
</p>

### Redirect to Strapi dashboard
```bash
/admin
```

# :books: Tech Stack 

## Client

<img src="./assets/JavaScript.svg" width="68"> &nbsp;&nbsp; <img src="./assets/React-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/MaterialUI-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/Redux.svg" width="68"> 
### <a href="https://github.com/OulehlaJan/ecommerce-fullstack/tree/master/client">More info</a>

### Payment Gateway Integration

+ **Uses Stripe.js and Stripe Elements for secure payment collection on the client-side.**

### Features

+ **Local Storage for Checkout**: Stores checkout data in local storage and clears it once the order is placed.
+ **Lazy Loading on Products**
+ **Fully responsive**

### Validated Checkout Inputs

+ **Shipping Information**
+ **Billing Information**
+ **Contact Info**

## Server - Heroku

<img src="./assets/Strapi-Monogram-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/PostgreSQL-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/Cloudinary.svg" width="90">
### <a href="https://github.com/OulehlaJan/ecommerce-fullstack/tree/master/server">More info</a>

### Payment Gateway Integration

+ **Handles payment processing on the server-side using Stripe API**: The server creates a Stripe session for payment, processes the transaction, and stores the order data, including item details and payment session ID, in Strapi (with data being stored in a PostgreSQL database).


### Content Management

+ **STRAPI headless CMS** for managing content and data models.

### Media Management

+ **Cloudinary** For storing media

### Database

+ **PostgreSQL**: For storing data.

### Security Settings

+ **Content Security Policy**
+ **HTTP Strict Transport Security**
+ **XSS Protection**
+ **Frameguard**
+ **NoSniff**
+ **Referrer Policy**
+ **Cross-Origin Resource Sharing**
