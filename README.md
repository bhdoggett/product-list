## Product List

This project was created by a student at Parsity, an online software engineering course. The work in this repository is wholly the student's, based on a sample starter project that can be accessed by viewing the repository this project was forked from.

If you have any questions about this project or the program, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

---

**Product List** is a basic mock e-commerce webpage for displaying and filtering available products for purchase. The backend server supports `GET`, `POST`, and `DELETE` requests for products and reviews. (Note: the frontend currently only makes use of the `GET /products` route.)

This project uses **MongoDB** for data storage, with **Mongoose** to interact with the database on the backend. The frontend is built using **React** and **Next.js**.

---

### Getting Started

1. **Install MongoDB** to host a local database.  
   [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

2. **Start the backend server** from the root directory:

```bash
node backend/server.js
```

3. Populate your database by sending a GET request to:

```bash
http://localhost:8000/generate-fake-data?number=<your-number>
```

If no number is provided, the server will default to generating 100 products.

4. Start the frontend development server. From the /frontend directory, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Navigate to '<your-frontend-development-server>/products — this will automatically route to '/products?page=1'.

Products are displayed 9 at a time, with pagination at the bottom of the page. You can search by name, filter by category, and sort by highest or lowest price.

Tech Stack

- MongoDB + Mongoose
- Node.js + Express
- React + Next.js
- Tailwind CSS
