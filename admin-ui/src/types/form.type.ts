export type LoginFormType = {
  email: string;
  password: string;
};

export type CategoryFormType = {
  categoryId?: string;
  categoryName?: string;
  status?: "active" | "inactive";
  imageUrl?: string;
};
