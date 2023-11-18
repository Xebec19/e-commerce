import { statusEnum } from "@/lib/enums";
import { CategoryFormType } from "@/types/form.type";
import { useForm } from "react-hook-form";

export default function CategoryForm({
  categoryId = null,
  categoryName = "",
  imageUrl = "",
  status = statusEnum.active,
}: CategoryFormType) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      categoryId,
      categoryName,
      imageUrl,
      status,
    },
  });
}
