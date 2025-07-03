import apiClient from "../configs/axiosConfig";
import { CHECK_USER_STATUS_URL } from "../constants/userConstant";

export const checkUserStatus = async () => {
  const response = await apiClient.get(CHECK_USER_STATUS_URL);
  return response.data;
};
