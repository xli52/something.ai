import express, { response } from "express";
const router = express.Router();

const userRouter = (db: any): any => {
  router.post("/login", (res: any, req: any) => {});
  router.post("/logout", (res: any, req: any) => {});

  return router;
};

export default userRouter;
