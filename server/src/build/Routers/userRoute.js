"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
const userRouter = (db) => {
    router.post("/login", (req, res) => {
        console.log("Received login request!", req.body);
        db.user
            .findOne({ where: { email: req.body.email } })
            .then((response) => {
            console.log("ORM search completed: ", response);
            if (!response) {
                console.log("Login ORM search response is null");
                return res.send("Invalid email or password.");
            }
            if (!bcryptjs_1.default.compareSync(req.body.password, response.dataValues.password)) {
                console.log("ORM search found user email but password does not match");
                return res.send("Invalid email or password.");
            }
            if (req.session.visitorID) {
                console.log("Login process: visitorID exists, deleting...");
                delete req.session.visitorID;
                console.log("visitorID deleted", req.session.visitorID);
            }
            console.log("ORM search found user email and password matched");
            req.session.userID = response.id;
            req.session.username = response.username;
            return db.users_character.findAll({
                where: { user_id: req.session.userID },
            });
        })
            .then((response) => {
            req.session.userCharacters = response.dataValues;
            res
                .status(200)
                .json({
                userID: req.session.userID,
                username: req.session.username,
                characters: req.session.userCharacters,
            });
        })
            .catch((err) => console.error(err));
    });
    router.post("/logout", (req, res) => {
        console.log("Received logout request!");
        console.log("Current user session: ", req.session);
        req.session = null;
        console.log("Confirm user session is empty: ", req.session);
        // maybe can run a delete audio file command upon logout
        res.status(200).send("You have already logged out! See you!");
    });
    router.post("/register", (req, res) => {
        console.log("Received registration request!", req.body);
        const salt = bcryptjs_1.default.genSaltSync(10);
        const password = bcryptjs_1.default.hashSync(req.body.password, salt);
        db.user
            .findOne({ where: { email: req.body.email } })
            .then((response) => {
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
                .then((response) => {
                console.log("Created user: " + response.id);
                req.session.userID = response.id;
                res.json({
                    userID: req.session.userID,
                    username: response.username,
                });
            });
        })
            .catch((err) => console.error(err));
    });
    return router;
};
exports.default = userRouter;
