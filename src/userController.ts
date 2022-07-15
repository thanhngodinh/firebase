import { db } from "./index";
import { Request, Response } from "express";

class UserController {
  constructor() {}

  // [GET] /search
  async search(req: Request, res: Response) {
    try {
      let obj: Object = {};
      const dbRef = db.collection("users");
      const term = await dbRef.get();
      term.forEach((doc: any) => {
        obj = {
          [doc.id]: doc.data(),
          ...obj,
        };
      });
      res.status(200).json(obj);
    } catch (err: any) {
      res.status(500).json({ message: "No matching documents." });
    }
  }

  // [POST] /search
  async searchPost(req: Request, res: Response) {
    try {
      const reqObj = req.body;
      let dbPromises: Array<any> = [];
      const dbRef = db.collection("users");
      
      // take each filter command into a separate obj
      for (let i = 0; i < Object.keys(reqObj).length; i++) {
        let resObj: Object = {};
        const term = await dbRef
          .where(Object.keys(req.body)[i], "==", Object.values(req.body)[i])
          .get();
        await term.forEach((doc: any) => {
          resObj = {
            [doc.id]: doc.data(),
            ...resObj,
          };
        });
        dbPromises.push(resObj);
      }

      // find the object contained in all obj above
      let resObj: Object = dbPromises[0];
      for (let i = 1; i < Object.keys(reqObj).length; i++) {
        let term: Object = {};
        for (let j = 0; j < Object.keys(resObj).length; j++) {
          if (Object.keys(resObj)[j] in dbPromises[i]) {
            term = {
              [Object.keys(resObj)[j]] : Object.values(resObj)[j],
              ...term
            }
          }
        }
        resObj = term;
        if (Object.keys(resObj).length == 0){
          break;
        }
      }
      
      res.status(200).json(resObj);
    } catch (err: any) {
      res.status(500).json({ message: "No matching documents." });
    }
  }

  // [GET] /users/:id
  async load(req: Request, res: Response) {
    try {
      let obj: Object = {};
      const dbRef = db.collection("users");
      const term = await dbRef.where("id", "==", `${req.params.id}`).get();
      term.forEach((doc: any) => {
        obj = {
          [doc.id]: doc.data(),
          ...obj,
        };
      });
      res.status(200).json(obj);
    } catch (err: any) {
      res.status(500).json({ message: "No matching documents." });
    }
  }

  // [POST] /users
  async create(req: Request, res: Response) {
    try {
      await db.collection("users").doc(`${req.body.id}`).set(req.body);
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  // [PUT] /users/:id
  async update(req: Request, res: Response) {
    try {
      await db.collection("users").doc(`${req.params.id}`).set(req.body);
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  patch(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {
    try {
      await db.collection("users").doc(`${req.params.id}`).delete();
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
}

export const userController = new UserController();
