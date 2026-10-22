import { onRequestOptions as __api_inquiry_js_onRequestOptions } from "C:\\Users\\FATES\\Desktop\\mitsui-template\\functions\\api\\inquiry.js"
import { onRequestPost as __api_inquiry_js_onRequestPost } from "C:\\Users\\FATES\\Desktop\\mitsui-template\\functions\\api\\inquiry.js"

export const routes = [
    {
      routePath: "/api/inquiry",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_inquiry_js_onRequestOptions],
    },
  {
      routePath: "/api/inquiry",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_inquiry_js_onRequestPost],
    },
  ]