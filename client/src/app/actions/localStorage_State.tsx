export function getLocalStorage() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const user_id = localStorage.getItem("user_id");
    const access_token_expires_at = localStorage.getItem(
      "access_token_expires_at"
    );
    console.log(token);
    return {
      token,
      refresh_token,
      user_id,
      access_token_expires_at,
    };
  }
}
