import express from "express";
import { Op } from "sequelize";

const router = express.Router();

const characterRouter = (db: any): any => {
  router.post("/purchase", (req: any, res: any) => {
    console.log("received unlock request, searching for character now");

    if (!req.session.userID) res.status(500).send("Please log in to purchase");

    db.character
      .findOne({
        where: {
          [Op.and]: [
            { name: req.body.character },
            { price_cents: req.body.price },
          ],
        },
      })
      .then((response: any) => {
        if (!response)
          res.status(500).send("Oops, something went wrong! Please try again!");

        db.users_character
          .findOne({
            where: {
              [Op.and]: [
                { user_id: req.session.userID },
                { character_id: response.id },
              ],
            },
          })
          .then((response: any) => {
            console.log("Unlocking character for user");

            db.users_character
              .upsert({
                id: response.id,
                unlocked: true,
              })
              .then((response: any) => {
                console.log("upsert done, result is: ", response);
                console.log("sending characters array back to front-end");

                req.session.userCharacters.push({
                  name: req.body.character,
                  price: req.body.price,
                });
                console.log(
                  "Now the character array is: ",
                  req.session.userCharacters
                );

                return res.send(req.session.userCharacters);
              });
          });
      })
      .catch((error: any) => {
        console.error(error);
      });
  });
  return router;
};

export default characterRouter;
