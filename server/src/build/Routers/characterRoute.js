"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const router = express_1.default.Router();
const characterRouter = (db) => {
    router.post("/purchase", (req, res) => {
        console.log("received unlock request, searching for character now");
        if (!req.session.userID)
            res.status(500).send("Please log in to purchase");
        db.character
            .findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { name: req.body.character },
                    { price_cents: req.body.price },
                ],
            },
        })
            .then((response) => {
            if (!response)
                res.status(500).send("Oops, something went wrong! Please try again!");
            db.users_character
                .findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { user_id: req.session.userID },
                        { character_id: response.id },
                    ],
                },
            })
                .then((response) => {
                console.log("Unlocking character for user");
                db.users_character
                    .upsert({
                    id: response.id,
                    unlocked: true,
                })
                    .then((response) => {
                    console.log("upsert done, result is: ", response);
                    console.log("sending characters array back to front-end");
                    req.session.userCharacters.push({
                        name: req.body.character,
                        price: req.body.price,
                    });
                    console.log("Now the character array is: ", req.session.userCharacters);
                    return res.send(req.session.userCharacters);
                });
            });
        })
            .catch((error) => {
            console.error(error);
        });
    });
    return router;
};
exports.default = characterRouter;
