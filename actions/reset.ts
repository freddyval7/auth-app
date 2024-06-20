"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);

  return { success: "Reset link sent!" };
};
