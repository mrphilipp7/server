import User, { IUser } from "../models/user.model";

// Create a new User
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

// Read User by ID
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).exec();
};

// Update User by ID
export const updateUserById = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

// Delete User by ID
export const deleteUserById = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id).exec();
};

// Get User by Email
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email: email }).exec();
};
