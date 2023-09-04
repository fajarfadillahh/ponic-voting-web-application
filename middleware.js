import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const token = request.cookies.get("token");

      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );

      const response = NextResponse.next();

      response.cookies.set({
        name: "fullname",
        value: verify.payload.fullname,
        expires: verify.payload.exp * 1000,
        path: "/",
      });
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/rooms")) {
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const token = request.cookies.get("token");

      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );

      const response = NextResponse.next();

      response.cookies.set({
        name: "fullname",
        value: verify.payload.fullname,
        expires: verify.payload.exp * 1000,
        path: "/",
      });
      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
}
