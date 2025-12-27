const STORAGE_KEY = "z_journal_admin_authed";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER ?? "admin";
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "changeme";

export const verifyCredentials = (username: string, password: string) =>
  username === ADMIN_USER && password === ADMIN_PASSWORD;

export const getAdminSession = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const setAdminSession = (value: boolean) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
};
