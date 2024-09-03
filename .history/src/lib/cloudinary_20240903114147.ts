import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

export async function uploadImage(image: File, tags: string[]) {
  const bufferedImage = await image.arrayBuffer();
  const buffer = new Uint8Array(bufferedImage);
  if (image.size === 0) {
    return image.name;
  }
  const imageName = `portfolio/${image.name}`;
  await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader
      .upload_stream(
        {
          public_id: imageName,
          resource_type: "auto",
          // folder: "portfolio",
          format: "svg",
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          tags: tags,
        },
        function (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) {
          if (error) {
            reject(error);
            return;
          }
          if (!result) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
  return imageName;
}

export async function uploadScreenshots(images: File[], tags: string[]) {
  const screenshots: string[] = [];

  images.forEach(async (image) => {
    const bufferedImage = await image.arrayBuffer();
    const buffer = new Uint8Array(bufferedImage);

    if (image.size === 0) {
      return screenshots.push(image.name);
    }
    const imageName = `portfolio/screenshots/${image.name}`;
    // console.log("imageName", imageName);
    // console.log("screenshots", screenshots);
    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader
        .upload_stream(
          {
            public_id: imageName,
            resource_type: "auto",
            // folder: "portfolio",
            format: "jpeg",
            use_filename: true,
            unique_filename: false,
            overwrite: false,
            tags: tags,
          },
          function (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) {
            if (error) {
              reject(error);
              return;
            }
            if (!result) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    }).then(() => {
      console.log("THEN");
      screenshots.push(imageName);
      console.log("THEN-SCREENSHOTS", screenshots);
    });
  });

  console.log("screenshots", screenshots);
  return screenshots;
}

export async function deleteImage(public_id: string) {
  cloudinary.uploader.destroy(public_id).then((res) => {
    return res;
  });
}

export async function deleteScreenshots(screenshots: string[]) {
  cloudinary.api.delete_resources(screenshots).then((res) => {
    // console.log("deleteScreenshots", res);
    console.log("deleteScreenshots – screenshots", screenshots);
    return res;
  });
}
