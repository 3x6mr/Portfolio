"use server";

import { db } from "@/firebase/admin";

export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return { success: false, message: "User already exists" };
    }
    await db.collection("user").doc(uid).set({ name, email });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log("Error Message: ", e);

    if (e.code === "auth/email-already-exists") {
      return { success: false, message: "Email already exists" };
    }

    return { success: false, message: "Failed to sign up" };
  }
}
