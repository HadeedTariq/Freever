import * as jwt from "jsonwebtoken";
type User = {
  userid: number;
  username: string;
  passion: string[];
};
const refreshAccessTokenGenerator = (user: User) => {
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET!);
  const refreshToken = jwt.sign(
    { userid: user.userid },
    process.env.JWT_REFRESH_TOKEN_SECRET!
  );
  return { refreshToken, accessToken };
};

export { refreshAccessTokenGenerator };
