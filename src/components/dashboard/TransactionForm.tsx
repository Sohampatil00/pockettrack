import { useState } from 'react';
import { PlusCircle, Wallet, Calendar, FileText, IndianRupee, Tag, Sparkles } from 'lucide-react';
import { CATEGORIES, type TransactionType, type Category } from '../../types';
import { useApp } from '../../context/AppContext';
import { todayISO } from '../../utils/currency';
import { guessCategoryFromDescription } from '../../utils/categoryMatcher';

export function TransactionForm() {
  const { addTransaction } = useApp();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState(todayISO());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food & Dining');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDesc, setErrorDesc] = useState('');
  const [errorAmt, setErrorAmt] = useState('');
  const [autoCategorized, setAutoCategorized] = useState(false);

  const handleDescriptionBlur = () => {
    if (!description.trim()) return;
    
    const guessedCategory = guessCategoryFromDescription(description);
    if (guessedCategory && guessedCategory !== category) {
      setCategory(guessedCategory);
      setAutoCategorized(true);
      
      // Auto-switch to income if category is Salary
      if (guessedCategory === 'Salary') {
        setType('income');
      } else if (type === 'income' && guessedCategory !== 'Investment' && guessedCategory !== 'Other') {
         // Auto-switch to expense if it matched an expense category but form was on income
        setType('expense');
      }

      // Hide the "Magic category" message after a few seconds
      setTimeout(() => setAutoCategorized(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let valid = true;

    // Validate Description
    if (!description.trim()) {
      setErrorDesc('Description is required.');
      valid = false;
    } else {
      setErrorDesc('');
    }

    // Validate Amount
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorAmt('Enter a valid positive amount.');
      valid = false;
    } else {
      setErrorAmt('');
    }

    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    // Add via context
    addTransaction({
      type,
      date,
      description: description.trim(),
      amount: parsedAmount,
      category,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setDate(todayISO());
    // (Optional: keep Type and Category as is for rapid entry)
    
    // Simulate slight delay for visual UX
    setTimeout(() => {
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div className="card p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-brand-500" />
          Add Transaction
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Record your daily income and expenses.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Row 1: Type & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="tx-type" className="form-label flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-slate-400" />
              Type
            </label>
            <select
              id="tx-type"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className="form-select"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="tx-date" className="form-label flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              Date
            </label>
            <input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              max={todayISO()}
              required
            />
          </div>
        </div>

        {/* Row 2: Description & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="tx-desc" className="form-label flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              Description
            </label>
            <input
              id="tx-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionBlur}
              placeholder="e.g. Salary, Groceries"
              className={`form-input ${errorDesc ? 'error' : ''}`}
            />
            {errorDesc && <p className="error-text">{errorDesc}</p>}
          </div>

          <div>
            <label htmlFor="tx-amount" className="form-label flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-slate-400" />
              Amount (₹)
            </label>
            <input
              id="tx-amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`form-input ${errorAmt ? 'error' : ''}`}
            />
            {errorAmt && <p className="error-text">{errorAmt}</p>}
          </div>
        </div>

        {/* Row 3: Category */}
        <div>
          <label htmlFor="tx-category" className="form-label flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-slate-400" />
            Category
          </label>
          <select
            id="tx-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="form-select"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          
          <div className="h-4 mt-1">
             {autoCategorized && (
               <p className="text-xs text-brand-600 flex items-center gap-1 animate-fade-in">
                 <Sparkles className="w-3 h-3" />
                 Auto-categorized!
               </p>
             )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center mt-2 group"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Add Transaction
              <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
