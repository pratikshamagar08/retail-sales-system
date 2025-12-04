**Project Setup:**

**…or create a new repository on the command line**

echo "# Class-Component" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/pratikshamagar08/retail-sales-system.git
git push -u origin main

**…or push an existing repository from the command line**

git remote add origin https://github.com/pratikshamagar08/retail-sales-system.git
git branch -M main
git push -u origin main

**Project Structure – Retail Sales System**

**Summary:**
The Retail Sales System is a centralized web platform designed to help retail businesses monitor, manage, and optimize their overall sales performance across multiple channels.
It provides insights into online sales, POS transactions, and marketplace orders, along with region-wise and product-wise analytics. The system supports real-time dashboards, 
trend analysis, and customer behaviour tracking for better decision-making.
It includes complete management modules such as Sales Data Management, Product & Category Management, Region & Store Management, and User & Role Management with role-based access for Admins, Sales Managers, Analysts, and Viewers.

**Project Overview**
A centralized platform that helps retail businesses track and analyze:
•	Multi-channel sales (online, POS, marketplaces)
•	Region-wise performance
•	Product-wise revenue and trends
•	Customer behavior insights
•	Predictive analytics

**1. Sales Data Management**
•	Import / Sync Sales Data
•	View & Filter Sales
•	Real-time Dashboard
**2. Product & Category Management**
•	Add / Edit Product Details
•	Product Performance
**3. Region & Store Management**
•	Add Stores / Sales Channels
•	Region Mapping
•	Store Analytics
**4. User & Role Management**

**Roles**
•	Admin
•	Sales Manager
•	Analyst
•	Viewer

**Frontend**
•	React
•	Axios
•	API integration
•	React Router v6
•	Tailwind CSS 
•	State Management
•	Redux Toolkit / Context API

**Backend**
•	To handle API & business logic
•	PostgreSQL / MongoDB
•	For storing sales, products, stores
•	Secure login




**Big Picture**
**Project details:**
•	Backend (server/) – json-server turns db.json into REST APIs.
•	Frontend (client/) – React app with:
o	Routing (React Router) → which page/component to show
o	State Management (Redux Toolkit) → global data (auth, products, stores, sales, dashboard)
o	UI Pages → Dashboard, Sales, Products, Stores
o	Layout → Sidebar + Topbar + main content
o	API Layer → axiosClient talking to json-server

**Data flow example (Products):**

UI → dispatch(action) → thunk calls axios → json-server → returns data → thunk → reducer updates Redux store → UI re-renders.

