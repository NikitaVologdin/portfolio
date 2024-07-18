import { writeFile } from "fs/promises";
import path from "path";

interface body {
  image: { name: string };
}

export default async function createImage(
  fd: FormData,
  body: body,
  directory: string
) {
  const image = fd.get("image") as File;
  if (!image || !(image instanceof File)) {
    throw new Error("No image received");
  }

  if (image.size === 0) {
    const imageName = body.image.name;
    return imageName;
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const imageName = image.name.replaceAll(" ", "_");
  await writeFile(
    path.join(process.cwd(), `public/${directory}/` + imageName),
    buffer
  );
  return imageName;
}
