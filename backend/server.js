import db from "./config/db.js";
import app from "./config/app.js";
import "./utils/config.env.js";

let port = process.env.PORT || 4321;

(async () => {
  try {
    app.listen(port, () => {
      console.log(`Server fired up on port : ${port}`);
    });
    db();
  } catch (err) {
    console.error(`Error occured : ${err}`);
  }
})();
