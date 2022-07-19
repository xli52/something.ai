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
                    { name: req.body.character.toLowerCase().trim() },
                    { price_cents: req.body.price },
                ],
            },
        })
            .then((response) => {
            console.log("search character result: ", response);
            if (!response)
                res.send("Oops, something went wrong! Please try again!");
            db.sequelize
                .query("SELECT id, user_id, character_id, unlocked FROM users_characters WHERE user_id = ? AND character_id = ?", {
                replacements: [req.session.userID, response.id],
                type: sequelize_1.QueryTypes.SELECT,
                raw: true,
            })
                .then((response) => {
                console.log("user_character table search done: ", response);
                console.log("Unlocking character for user");
                db.sequelize
                    .query(`UPDATE users_characters
            SET unlocked = ?
            WHERE id = ?`, {
                    replacements: [true, response[0].id],
                    type: sequelize_1.QueryTypes.UPDATE,
                    raw: true,
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
