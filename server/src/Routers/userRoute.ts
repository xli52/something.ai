import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();

const userRouter = (db: any): any => {
  router.post("/login", (req: any, res: any) => {
    console.log("Received login request!", req.body);

    db.user
      .findOne({ where: { email: req.body.email } })
      .then((response: any) => {
        console.log("ORM search completed: ", response);
        if (!response) {
          console.log("Login ORM search response is null");
          return res.send("Invalid email or password.");
        }

        if (
          !bcrypt.compareSync(req.body.password, response.dataValues.password)
        ) {
          console.log(
            "ORM search found user email but password does not match"
          );
          return res.send("Invalid email or password.");
        }

        if (req.session.visitorID) {
          console.log("Login process: visitorID exists, deleting...");
          delete req.session.visitorID;
          console.log("visitorID deleted", req.session.visitorID);
        }

        console.log("ORM search found user email and password matched");
        req.session.userID = response.id;
        res
          .status(200)
          .json({ userID: req.session.userID, username: response.username });
      })
      .catch((err: any) => console.error(err));
  });

  router.post("/logout", (req: any, res: any) => {
    console.log("Received logout request!");
    console.log("Current user session: ", req.session);
    req.session = null;
    console.log("Confirm user session is empty: ", req.session);
    // maybe can run a delete audio file command upon logout
    res.status(200).send("You have already logged out! See you!");
  });

  router.post("/register", (req: any, res: any) => {
    console.log("Received registration request!", req.body);
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    db.user
      .findOne({ where: { email: req.body.email } })
      .then((response: any) => {
        console.log("Search completed, response is: ");
        console.log(response);
        if (response) {
          return res.send("User already exists.");
        }
        return db.user
          .create({
            username: req.body.username,
            password,
            email: req.body.email,
            createAt: new Date(),
            updatedAt: new Date(),
          })
          .then((response: any) => {
            console.log("Created user: " + response.id);
            req.session.userID = response.id;
            res.json({
              userID: req.session.userID,
              username: response.username,
            });
          });
      })
      .catch((err: any) => console.error(err));
  });

  return router;
};

export default userRouter;
