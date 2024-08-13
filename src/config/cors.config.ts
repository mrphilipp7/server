import cors from "cors";

export function configureCors() {
  if (process.env.NODE_ENV !== "production") {
    console.log("+-------------------------+");
    console.log("Running in development...");
  } else {
    console.log("+-------------------------+");
    console.log("Running in production...");
  }

  let allowedOrigins: string[] = [];
  if (process.env.NODE_ENV === "production") {
    allowedOrigins = ["http://localhost:8080", "https://localhost:8443"]; // Replace with your production domain
  } else {
    allowedOrigins = ["http://localhost:5173"]; // Replace with your development client URL
  }

  return cors({
    origin: function (origin, callback) {
      if (
        allowedOrigins.includes("*") ||
        (origin && allowedOrigins.includes(origin)) ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Ensure credentials (cookies) are allowed
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    methods: "GET, POST, PUT, DELETE",
  });
}
