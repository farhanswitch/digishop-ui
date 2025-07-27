export default function RefreshTokenUtility(res) {
  const refreshToken = res.headers.get("Xrf-Token");
  if (refreshToken) {
    localStorage.setItem("digishopToken", refreshToken);
  }
}
