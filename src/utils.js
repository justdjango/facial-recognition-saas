import { Responsive } from "semantic-ui-react";
import axios from "axios";
import { APIEndpoint } from "./constants";

export const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export const authAxios = axios.create({
  baseURL: APIEndpoint,
  headers: {
    Authorization: {
      toString() {
        return `Token ${localStorage.getItem("token")}`;
      }
    }
  }
});
