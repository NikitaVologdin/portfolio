import { Skill as Skills } from "@/models/skills";
import dbConnect from "./dbConnect";
import { Model } from "mongoose";

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
    const response = await fetch(`http://localhost:3000/api/${path}/` + id, {
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

async function updateData(form: HTMLFormElement, id: string, path: string) {
  try {
    const fd = new FormData(form);
    const formData = Object.fromEntries(fd.entries());
    formData._id = id;
    const response = await fetch("http://localhost:3000/api/" + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to update developers information");
    }
  }
}

async function fetchDataWithPopulate<T>(model: Model<T>, populate?: string) {
  try {
    await dbConnect();
    let response;
    if (populate) {
      response = await model.find().populate(populate);
    } else {
      response = await model.find();
    }
    const data = JSON.parse(JSON.stringify(response));
    if (data.length > 1) {
      return data;
    } else {
      return data[0];
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message || "Failed to fetch data");
    }
  }
}

async function deleteData(path: string, id: string) {
  try {
    const response = fetch(`http://localhost:3000/api/${path}/${id}`, {
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
  updateData,
  fetchDataWithPopulate,
  deleteData,
};
