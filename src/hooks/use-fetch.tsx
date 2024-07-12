import { connectDB } from "@/lib/utils";

interface Ierror {
  message: string;
}

export default async function useFetch(fetchFn:()=>Promise<{}>) {
  connectDB();
      try {
        const response = await fetchFn();
        const data = JSON.parse(JSON.stringify(response));
        return data
      } catch (e:Ierror) {
        throw new Error(e.message || "Failed to fetch data");
      }
    }

  return data;
}
