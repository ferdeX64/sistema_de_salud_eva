import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** Datos de la lista */
    list: Array<any>;
  };
};

/** 卡片列表 */
export const getCardList = (data?: object) => {
  return http.request<Result>("post", "/getCardList", { data });
};

/** 版本日志 */
export const getReleases = () => {
  return http.request<Result>("get", "/releases");
};
