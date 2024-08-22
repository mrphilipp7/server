import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with complexity of 10
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
