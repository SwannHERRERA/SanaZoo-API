export function getToken(bearerToken: string): string {
  const token = bearerToken.split(" ")[1];
  if (token) {
    return token;
  }
  return "";
}
