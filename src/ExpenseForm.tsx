import React from "react";
import categories from "./categories";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import errorMap from "zod/locales/en.js";

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "مشخصات حداقل باید از سه حرف تشکیل شده باشد." })
    .max(50, { message: "مشخصات حداکثر  از پنجاه حرف تشکیل شده باشد." }),
  amount: z.number({ invalid_type_error: "لطفا قیمت را وارد کنید." }).min(1),
  category: z.enum(categories, {
    errorMap: () => ({ message: "انتخاب دسته بندی الزامی است" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      style={{ textAlign: "right", direction: "rtl" }}
      action=""
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          مشخصات
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          قیمت
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          دسته بندی
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">افزودن به سبد خرید</button>
    </form>
  );
};

export default ExpenseForm;
