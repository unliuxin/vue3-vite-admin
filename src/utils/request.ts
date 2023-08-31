import { fetch, get, post, del, put } from "./fetch";
import { useUserStore } from "@/store/modules/user";
const onGetTokens = (): [string, string?] => {
  const userStore = useUserStore();
  return [userStore.token];
};

const request = fetch({ onGetTokens, baseURL: "" });

export { request, get, post, del, put };
