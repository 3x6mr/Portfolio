"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;
export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists , please sign in",
      };
    }
    await db.collection("users").doc(uid).set({ name, email });
    return {
      success: true,
      message: "Account Created Successfully, Please Sign In",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log("Error Message: ", e);

    if (e.code === "auth/email-already-exists") {
      return { success: false, message: "Email already exists" };
    }

    return { success: false, message: "Failed to sign up" };
  }
}
export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "Email is not found, please SignUp instead!",
      };
    }
    await setSessionCookie(idToken);
  } catch (e) {
    console.log("Error Message", e);
    return { success: false, message: "Failed to Sign in" };
  }
}
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });
  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    maxAge: ONE_WEEK,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
