const pool = require("../../node-chat/config/database");

module.exports = {
    validateUser: (req, res, next) => {
      pool.query(
        `select * from users where userId = ? AND userPassword = ?`,
        [req.body.userId, req.body.userPassword],
        (error, results) => {
          if (error) {
            return res.status(401).json({
                success: 0,
                message: "Invalid User Creds..."
            });
          }
          if(results.length === 0){
            return res.status(401).json({
                success: 0,
                message: "Invalid User Creds..."
            });
          }
          next();
        }
      );
    },
    validateNewUser: (req, res, next) => {
      pool.query(
        `select * from users where userId = ?`,
        [req.body.newUserId],
        (error, results) => {
          if (error) {
            return res.status(401).json({
                success: 0,
                message: "Invalid User NewUser Id..."
            });
          }
          if(results.length === 0){
            return res.status(401).json({
                success: 0,
                message: "Invalid User NewUser Ids..."
            });
          }
          next();
        }
      );
    },
    validateAdmin: (req,res, next) => {
      console.log(res);
        pool.query(
          `select * from users where userId = ? AND userPassword = ? AND admin = 1`,
          [req.body.userId, req.body.userPassword],
          (error, results) => {
            console.log(results)
            if (error) {
                return res.status(401).json({
                    success: 0,
                    message: "Invalid User Creds..."
                });
            }
            else if(results.length === 0){
                return res.status(401).json({
                    success: 0,
                    message: "Invalid User Creds..."
                  });
            }else{
              console.log(results)
              next();
            }
          }
        );
      },
  };
