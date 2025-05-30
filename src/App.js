import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const categories = [
  "Loan", "Condo", "Utilities", "Household", "Transportation",
  "Insurance", "Education", "Financial Planning", "Debt"
];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ date: "", item: "", category: "", amount: "" });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddExpense = () => {
    if (!form.item || !form.category || !form.amount) return;
    setExpenses([...expenses, { ...form, amount: parseFloat(form.amount) }]);
    setForm({ date: "", item: "", category: "", amount: "" });
  };

  const summary = categories.map(category => {
    const total = expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { category, total };
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Add Expense</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <input placeholder="Date" value={form.date} onChange={e => handleChange("date", e.target.value)} />
        <input placeholder="Item" value={form.item} onChange={e => handleChange("item", e.target.value)} />
        <select value={form.category} onChange={e => handleChange("category", e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input placeholder="Amount" type="number" value={form.amount} onChange={e => handleChange("amount", e.target.value)} />
      </div>
      <button onClick={handleAddExpense} style={{ marginTop: '1rem' }}>Add</button>

      <h2 style={{ marginTop: '2rem' }}>Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summary.filter(s => s.total > 0)}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}