const express = require("express");
const notificationContent = require("./routes/notificationContent");
const notification = require("./routes/notification");
const laundry = require("./routes/laundry");
const barang = require("./routes/barang");
const driver = require("./routes/driver");
const userRoutes = require("./routes/user");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/notification_content", notificationContent);
app.use("/notification", notification);
app.use("/laundry", laundry);
app.use("/barang", barang);
app.use("/driver", driver);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
