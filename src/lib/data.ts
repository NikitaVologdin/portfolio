import dbConnect from "./dbConnect";
import developerModel from "../models/developer";
import { IDeveloper } from "../types/Developer";

const fetchDeveloper = async () => {
  dbConnect();
  try {
    const developer = (await developerModel.findOne()) as IDeveloper;
    if (!developer) throw new Error("developer not found");
    return JSON.parse(JSON.stringify(developer));
  } catch (error) {
    throw new Error("failed to fetch intro data");
  }
};

export { fetchDeveloper };
