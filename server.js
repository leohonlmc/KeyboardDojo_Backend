const app = require("./index"); // Import the Express app setup
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
