const pool = require("../../config/database");

module.exports = {
  create: (req, res) => {
    pool.query(
      `INSERT INTO users (userId, userPassword, name, email, admin) 
                values(?,?,?,?,?)`,
      [
        req.newUserId,
        req.newUserPassword,
        req.name,
        req.email,
        req.admin
      ],
      (error, results) => {
        if (error) {
          return res.status(400).json({
            status: 0,
            "message":" error"
          })
        }
        return res.status(200).json({
          status: 1,
          "message": "User Created"
        })
      }
    );
  },
  editUsers: (req, res) => {
    pool.query(
      `update users set userPassword=?, name=?, email=?, admin=? where userId = ?`,
      [
        req.newUserPassword,
        req.name,
        req.email,
        req.admin,
        req.newUserId
      ],
      (error, results) => {
        console.log(results["affectedRows"])
        if (error || results["affectedRows"] === 0) {
          return res.status(400).json({
            status: 0,
            "message":" error"
          })
        }
        return res.status(200).json({
          status: 1,
          "message": "User Updated"
        })
      }
    );
  },
  searchUsers: (req, res) => {
    console.log(typeof req)
    if(req === "all"){
      pool.query(
        `select userId, name, email, admin from users`,
        (error, results) => {
          if (error) {
            return res.status(404).json({
              status: 0,
              "message":" error"
            })
          }
          console.log(results)
          return res.status(200).json({
            status: 1,
            "message": "Found",
            data: {results}
          })
        }
      );
    }else{
      pool.query(
        `select userId, name, email, admin from users where userId = ?`,
        [
          req
        ],
        (error, results) => {
          console.log(results["affectedRows"])
          if (error || results.length === 0) {
            return res.status(404).json({
              status: 0,
              "message":"User not exist or error"
            })
          }
          return res.status(200).json({
            status: 1,
            "message": "Found",
            data: results
          })
        }
      );
    }
  },
  createUserGroup: (req, res) => {
    return new Promise((resolve, reject) => {
      console.log(req.groupId)
      pool.query(
        `CREATE TABLE groupTable? (messageId INT PRIMARY KEY, sfrom INT, message VARCHAR(255))`,
        [
          req.groupId
        ],
        (error, results) => {
          if (error) {
            console.log("ERROR", error)
            return reject(error);
          }else{
            console.log("RES",results)
            return resolve(results);
          }
        }
      );
    });
  },
  addUserGroup: (req, res) => {
    return new Promise((resolve, reject) => {
      console.log("Add user grp")
      pool.query(
        `INSERT INTO groups (id, userId) 
                  values(?,?)`,
        [
          req.groupId,
          req.userId
        ],
        (error, results) => {
          if (error) {
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  },
  getGroupMembers: (req, res) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM groups WHERE id =?`,
        [
          req
        ],
        (error, results) => {
          console.log(results)
          if (error) {
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  },
  deleteGrp: (req, res) => {
    console.log("del user grp")
    return new Promise((resolve, reject) => {
      pool.query(
        `DROP TABLE groupTable?`,
        [
          req.groupId
        ],
        (error, results) => {
          if (error) {
            console.log(error)
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  },
  getMsg: (req, res) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM groupTable?`,
        [
          req.groupId
        ],
        (error, results) => {
          if (error) {
            console.log(error)
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  },
  deleteIdgroup: (req, res) => {
    console.log("del user grp")
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM groups WHERE id = ?`,
        [
          req.groupId
        ],
        (error, results) => {
          if (error) {
            console.log(error)
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  },
  addMessage: (req, res) => {
    return new Promise((resolve, reject) => {
      msgId = parseInt(String(Date.now()).slice(-6))+req.userId;
      console.log(Date.now(), msgId)
      pool.query(
        `INSERT INTO groupTable? (messageId, sfrom, message) values(?,?,?)`,
        [
          req.groupId,
          msgId,
          req.userId,
          req.msg
        ],
        (error, results) => {
          if (error) {
            console.log(error)
            return reject(error)
          }
          return resolve(results)
        }
      );
    });
  }
};