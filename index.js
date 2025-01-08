const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const notificationContent = require("./routes/notificationContent");
const notification = require("./routes/notification");
const laundry = require("./routes/laundry");
const barang = require("./routes/barang");
const driver = require("./routes/driver");
const user = require("./routes/user");
const order = require("./routes/order");
const service = require("./routes/service");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// app.use("/user", user);
// app.use("/service", service);
// app.use("/order", order);
app.use("/notification_content", notificationContent);
app.use("/notification", notification);
app.use("/laundry", laundry);
app.use("/barang", barang);
app.use("/driver", driver);
app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
