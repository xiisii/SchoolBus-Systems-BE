import axios from "axios";
import {
  generateAuthURLForStranger,
  generateUploadURLForEmployee,
  generateUploadURLForStranger,
} from "./s3";

export const putImageToEmployee = async (image, name) => {
  const url = await generateUploadURLForEmployee(name);
  const res = await axios.put(url, image, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
  return res;
};

export const putImageToStranger = async (image, name) => {
  const url = await generateUploadURLForStranger(name);
  const res = await axios.put(url, image, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
  return res;
};

export const authenticateImage = async (objectKey) => {
  const url = await generateAuthURLForStranger(objectKey);
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
