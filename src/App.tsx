import ExpenseFilter from "./ExpenseFilter";
import ExpenseList from "./ExpenseList";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import categories from "./categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "توپ", amount: 10, category: "سرگرمی" },
    { id: 2, description: "شلوار", amount: 10, category: "عمومی" },
    { id: 3, description: "بشقاب", amount: 10, category: "عمومی" },
    { id: 4, description: "ویدئو گیم", amount: 10, category: "سرگرمی" },
    { id: 5, description: "برنج", amount: 10, category: "مواد غذایی" },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  return (
    <div>
      <div className="mb-3">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;
