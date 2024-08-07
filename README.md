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
  <a href="https://stylish-one.netlify.app">Ecommerce - Stylish One</a> :point_left: <br/>
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

<img src="./assets/Strapi-Monogram-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/PostgreSQL-Dark.svg" width="68"> &nbsp;&nbsp; <img src="./assets/Cloudinary_logo.png" width="310"> &nbsp;&nbsp; <img src="./assets/Cloudinary.svg" width="88">
### <a href="https://github.com/OulehlaJan/ecommerce-fullstack/tree/master/server">More info</a>

### Payment Gateway Integration
+ **Uses Stripe API**

### Content Management

+ **STRAPI headless CMS** for managing content and data models.
+ **Order Management** Strapi provides the API and backend logic to handle order data.

### Media Management

+ **Cloudinary**

### Database

+ **PostgreSQL**: The backend database for Strapi

### Security Settings

+ **Content Security Policy**
+ **HTTP Strict Transport Security**
+ **XSS Protection**
+ **Frameguard**
+ **NoSniff**
+ **Referrer Policy**
+ **Cross-Origin Resource Sharing**

# &#129513; Dependencies

### Client

+ axios 1.7.2
+ dotenv 16.4.5
+ formik 2.4.6
+ yup 1.4.0
+ lodash.throttle 4.1.1
+ react-anchor-link-smooth-scroll 1.0.12
+ react-responsive-carousel 3.2.23
+ react-lazyload 3.2.1
+ react-router-dom 5.3.4
+ react-redux 9.1.2
+ react 18.3.1
+ react-dom 18.3.1
+ react-scripts 5.0.1
+ web-vitals 2.1.4
+ @reduxjs/toolkit 2.2.6
+ @stripe/stripe-js 4.1.0
+ @mui/material 5.15.21
+ @mui/icons-material 5.15.21
+ @emotion/styled 11.11.5
+ @emotion/react 11.11.4
+ @testing-library/react 13.4.0
+ @testing-library/user-event 13.5.0
+ @testing-library/jest-dom 5.17.0
+ @babel/plugin-proposal-private-property-in-object 7.21.11

### Server

+ stripe 16.6.0
+ @strapi/strapi 4.7.0
+ @strapi/plugin-users-permissions 4.7.0
+ @strapi/plugin-i18n 4.7.0
+ @strapi/provider-upload-cloudinary 4.25.6
+ @strapi/plugin-cloud 4.25.1
+ pg 8.12.0
+ pg-connection-string 2.6.4
+ react 18.3.1
+ react-dom 18.3.1
+ react-router-dom 5.3.4
+ styled-components 5.3.3
