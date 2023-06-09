import React from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  return (
    <table
      style={{ textAlign: "center", direction: "rtl" }}
      className="table table-bordered"
    >
      <thead>
        <tr>
          <th>مشخصات</th>
          <th>قیمت</th>
          <th>دسته بندی</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>جمع خرید</td>
          <td colSpan={2}>
            {expenses
              .reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed()}
            تومان
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
