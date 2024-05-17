const BUCKET_EMPLOYEE = "long-employee-images";
const BUCKET_STRANGER = "long-stranger-images";

const baseURL = "";

export async function generateUploadURLForEmployee(imageName) {
  return `${baseURL}/${BUCKET_EMPLOYEE}/${imageName}`;
}

export async function generateUploadURLForStranger(imageName) {
  return `${baseURL}/${BUCKET_STRANGER}/${imageName}`;
}

export async function generateAuthURLForStranger(imageName) {
  return `${baseURL}/employee?objectKey=${imageName}`;
}
