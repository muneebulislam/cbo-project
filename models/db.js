let instance = null;
class Db {
  static getDbInstance() {
    return instance ? instance : new Db();
  }
  getConnection(mysql) {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
      database: "cbo-db",
    });

    con.connect((err) => {
      if (err) {
        console.log(err.message);
      }
    });

    return con;
  }
}

module.exports = Db ;
