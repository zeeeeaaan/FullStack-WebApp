# 🏎️ **Golden Pre-Owned Cars – Full-Stack Used Car Dealership Website**

A fully responsive, modern used-car listing platform with admin management, dynamic filters, Cloudinary-hosted car images, and a Node.js/Express backend.
This project is completely free to host using **Netlify (Frontend)** and **Render (Backend)**.

---

## 🚀 **Features**

### ✔ Frontend (User Website)

* Fully responsive UI
* Car listings with:

  * Car image
  * Year, KM, Fuel, Transmission
  * Indian Rupee price formatting
  * Weekly estimated installment
  * Unique Reference ID
* Car details modal
* Search filter
* Brand filter
* Year filter
* Price filter
* Dark mode toggle
* Smooth reveal animations
* WhatsApp “Click to Chat” integration
* Cloudinary-hosted image support

### ✔ Admin Panel

* Login using admin password
* Add new cars
* Delete cars
* Upload images to Cloudinary & paste URL
* Form validation
* Instant auto-refresh

### ✔ Backend

* Node.js + Express server
* JSON-based storage (`cars.json`)
* API endpoints:

  * GET all cars
  * GET single car
  * POST add car
  * DELETE car
* Admin secret authentication
* CORS enabled
* Ready for Render hosting

---

## 🛠️ **Tech Stack**

### **Frontend**

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Cloudinary (for image hosting)
* Netlify (hosting)

### **Backend**

* Node.js
* Express.js
* CORS
* File-based JSON storage
* Render (hosting)

---

## 📁 **Project Structure**

### **Frontend Folder**

```
frontend/
│── index.html
│── admin.html
│── logo.png
│
├── css/
│   └── styles.css
│
└── js/
    ├── main.js
    └── admin.js
```

### **Backend Folder**

```
backend/
│── server.js
│── cars.json
├── package.json
└── package-lock.json
```

---

## 🔗 **API Endpoints**

### **GET All Cars**

```
GET /api/cars
```

### **GET Car by ID**

```
GET /api/cars/:id
```

### **Admin Login**

```
POST /api/admin/login
body: { "password": "your-secret" }
```

### **Add Car**

```
POST /api/cars
Headers: { "x-admin-secret": "your-secret" }
```

### **Delete Car**

```
DELETE /api/cars/:id
Headers: { "x-admin-secret": "your-secret" }
```

---

## 🔐 **Admin Authentication**

The backend uses a simple admin secret:

```js
const ADMIN_SECRET = process.env.ADMIN_SECRET || "golden-secret-123";
```

If no environment variable is added on Render, default password:

```
golden-secret-123
```

---

## 🏞️ **Cloudinary Setup**

Cloudinary is used for free image hosting.

### Steps:

1. Create free account at [https://cloudinary.com](https://cloudinary.com)
2. Go to Media Library → Upload
3. Right-click image → “Open in new tab”
4. Copy image URL like:

```
https://res.cloudinary.com/<cloud-name>/image/upload/v1234567/yourimage.jpg
```

5. Paste the URL in “Image URL” field in admin panel.

---

## 🌍 **Deployment**

### **BACKEND – Render**

1. Push backend folder to GitHub
2. Go to Render → New Web Service
3. Settings:

   * Build Command: `npm install`
   * Start Command: `node server.js`
4. Deploy
5. Get backend URL like:

```
https://golden-preowned-backend.onrender.com
```

---

### **FRONTEND – Netlify**

1. Go to Netlify
2. Add New Site → Deploy manually
3. Drag & drop **frontend folder**
4. Set `API_URL` in `main.js` + `admin.js`:

```js
const API_URL = "https://golden-preowned-backend.onrender.com";
```

5. Publish
6. Your site becomes live:

```
https://golden-preowned.netlify.app
```

---

## 💰 **Indian Currency Support**

Prices are displayed using:

```js
Number(car.price).toLocaleString("en-IN")
```

Example:

```
₹5,50,000
```

---

## 💬 **WhatsApp Integration**

Every car card has a “WhatsApp” button:

```js
https://wa.me/<YOUR_NUMBER>?text=Hi, I'm interested in <Car Title>
```

---

## 📌 **Future Improvements (Optional)**

* Real database (MongoDB / Supabase)
* File uploads directly to Cloudinary from admin panel
* JWT-based authentication
* Car comparison page
* SEO optimization

---

## 👨‍💻 **Developer**

**Golden Pre-Owned Cars**
Designed and developed using:

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* Cloudinary
* Netlify
* Render

---

## ⭐ **If you like this project, please star the repository!**

Your support motivates further improvements 🚀

https://golden-preowned.netlify.app/
