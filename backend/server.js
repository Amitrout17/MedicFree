const app = require("./app");
const connectDatabase = require("./config/database");

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server running  http://localhost:${process.env.PORT}`);
});
