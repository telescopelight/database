const mysql = require("mysql");

const db_config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "비밀번호",
  database: "tutorial",
};

module.exports = () => {
  return {
    init() {
      return mysql.createConnection(db_config);
    },
    test_connection(con) {
      con.connect((err) => {
        if (err) {
          console.error("mysql connection error : " + err);
        } else {
          console.log("mysql connected successfully!");
        }
      });
    },
  };
};