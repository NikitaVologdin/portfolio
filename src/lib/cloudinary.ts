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

export default async function uploadImage(image: Blob) {
  const bufferedImage = await image.arrayBuffer();
  const buffer = new Uint8Array(bufferedImage);
  let imageName;
  await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "portfolio" },
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
          imageName = result.public_id;
          resolve(result);
        }
      )
      .end(buffer);
  });
  return imageName;
}
