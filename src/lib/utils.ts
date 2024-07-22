import dbConnect from "./dbConnect";
import { Model } from "mongoose";

const uri = process.env.APP_URL || process.env.VERCEL_URL;

async function fetchDataOnServer<T>(model: Model<T>, id?: string) {
  try {
    await dbConnect();
    let response;
    if (id) {
      response = await model.findById(id);
    } else {
      response = await model.find();
    }
    const data = JSON.parse(JSON.stringify(response));
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to fetch data");
    }
  }
}

async function fetchDataOnClient(path: string, id?: string) {
  try {
    const response = await fetch(`http://${uri}/api/${path}/` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to fecth data");
    }
  }
}

async function fetchDataWithPopulate<T>(
  model: Model<T>,
  populate: string,
  id?: string
) {
  try {
    await dbConnect();
    let response;
    if (id) {
      response = await model.findById(id).populate(populate);
    } else {
      response = await model.find().populate(populate);
      // response = await model.find();
    }
    const data = JSON.parse(JSON.stringify(response));
    if (data.length > 1) {
      return data;
    } else {
      return data;
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to fetch data");
    }
  }
}

async function deleteData(path: string, id: string) {
  try {
    const response = fetch(`http://${uri}/api/${path}/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to delete skill");
    }
  }
}

export {
  fetchDataOnServer,
  fetchDataOnClient,
  // updateData,
  fetchDataWithPopulate,
  deleteData,
};
