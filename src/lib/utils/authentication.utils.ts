import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

function createAuthService() {
  // Create connection to .key files for JWT token authentication
  function readKeyFile(filePath: string) {
    const FILE_PATH = path.resolve(filePath);
    return fs.readFileSync(FILE_PATH, "utf8");
  }

  // Private access token
  const accessPrivateToken = readKeyFile("./keys/access_private.key");

  // Public access token
  const accessPublicToken = readKeyFile("./keys/access_public.key");

  // Private refresh token
  const refreshPrivateToken = readKeyFile("./keys/refresh_private.key");

  const accessTokenExpiration = "15m"; // Example expiration time for access token
  const refreshTokenExpiration = "7d"; // Example expiration time for refresh token

  /* payloads should be in format
    {
        userId: string,
        issued: new Date()
    }
  */

  function generateAccessToken(payload: object): string {
    return jwt.sign(payload, accessPrivateToken, {
      algorithm: "RS256",
      expiresIn: accessTokenExpiration,
    });
  }

  function generateRefreshToken(payload: object): string {
    return jwt.sign(payload, refreshPrivateToken, {
      algorithm: "RS256",
      expiresIn: refreshTokenExpiration,
    });
  }

  /*
    verification functions require that the token payload be an object
    ie. 
    const token = jwt.sign(
        { userId: 123, issued: new Date()},
        secretKey,
        { algorithm: "RS256", expiresIn: "3h" }
     );
*/

  function verifyAccessToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, accessPublicToken);
      return typeof decoded === "object" ? decoded : null;
    } catch (err) {
      return null;
    }
  }

  function verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, refreshPrivateToken);
      return typeof decoded === "object" ? decoded : null;
    } catch (err) {
      return null;
    }
  }

  function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies["access_token"];
    if (!token)
      return res.status(401).json({ message: "Access token is missing" });

    const decoded = verifyAccessToken(token);
    if (!decoded)
      return res.status(403).json({ message: "Invalid access token" });

    req.user = decoded; // Attach user information to request
    next();
  }

  function refreshToken(req: Request, res: Response) {
    const token = req.cookies["refresh_token"];
    if (!token)
      return res.status(401).json({ message: "Refresh token is missing" });

    const decoded = verifyRefreshToken(token);
    if (!decoded)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      issued: new Date(),
    });
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ message: "Access token refreshed" });
  }

  return {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    authenticate,
    refreshToken,
  };
}

const authService = createAuthService();

export default authService;
