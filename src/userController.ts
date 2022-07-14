import { db } from "./index";
import { Request, Response } from "express";

class UserController {
  constructor() {}

  // [GET] /search
  async search(req: Request, res: Response) {
    try {
      let obj: Object = {};
      const dbRef = db.collection("test");
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
      let resObj: Object = {};
      const reqObj = req.body;
      let dbPromises: Array<any> = [];
      const dbRef = db.collection("test");

      //   for (let i = 0; i < Object.keys(reqObj).length; i++) {
      //     console.log(i, dbPromises[i]);
      //     dbPromises.push(
      //       await dbRef
      //         .where(`${Object.keys(reqObj)[i]} == ${Object.values(reqObj)[i]}`)
      //         .orderBy(Object.keys(reqObj)[i])
      //         .get()
      //     );
      //   }
      
      const term = await dbRef.where("name", "==", `${req.body.name}`).get();
      await term.forEach((doc: any) => {
        resObj = {
          [doc.id]: doc.data(),
          ...resObj,
        };
      });
      res.status(200).json(resObj);
    } catch (err: any) {
      res.status(500).json({ message: "No matching documents." });
    }
  }

  // [GET] /users/:id
  async load(req: Request, res: Response) {
    try {
      let obj: Object = {};
      const dbRef = db.collection("test");
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
      await db.collection("test").doc(`${req.body.id}`).set(req.body);
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  // [PUT] /users/:id
  async update(req: Request, res: Response) {
    try {
      await db.collection("test").doc(`${req.params.id}`).set(req.body);
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  patch(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {
    try {
      await db.collection("test").doc(`${req.params.id}`).delete();
      res.status(200).json(req.body);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
}

export const userController = new UserController();
