import React from "react";
import categories from "./categories";
import { optional } from "zod";

interface Props {
  onSelectCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      style={{ textAlign: "right", direction: "rtl" }}
      className="form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">همه</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
      ;
    </select>
  );
};

export default ExpenseFilter;
