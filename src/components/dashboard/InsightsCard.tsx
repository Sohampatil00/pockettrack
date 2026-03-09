import { useState } from 'react';
import { Sparkles, ArrowRight, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../../context/AppContext';
import { generateInsights } from '../../services/aiService';

export function InsightsCard() {
  const { transactions } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateInsights(transactions);
      setInsights(result);
    } catch (err) {
      setError('Unable to fetch insights right now. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card relative overflow-hidden flex flex-col p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
      
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl gradient-insights text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            PocketTrack <span className="text-gradient-insights">AI Insights</span>
          </h2>
        </div>
        
        {insights ? (
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-4">
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{insights}</ReactMarkdown>
            </div>
          </div>
        ) : error ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center mb-6 text-red-500 bg-red-50 rounded-xl p-4">
              <AlertCircle className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-sm font-medium">{error}</p>
           </div>
        ) : (
          <p className="text-slate-600 mb-6 leading-relaxed flex-1">
            Get personalized financial trends and actionable advice based on your spending patterns. See where your money goes and how to optimize your budget.
          </p>
        )}
        
        <div className="space-y-4 pt-4 border-t border-slate-100/50 mt-auto">
          {!insights && !error && (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>Analyzes your last 30 days of transactions</span>
            </div>
          )}
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || transactions.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white gradient-insights shadow-sm transition-all duration-200 hover:shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed group"
          >
            {isGenerating ? (
              <>
                 <Sparkles className="w-5 h-5 animate-pulse" />
                 Analyzing data...
              </>
            ) : insights ? (
              <>
                 <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                 Refresh Insights
              </>
            ) : (
              <>
                Generate Insights
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
          
          {transactions.length === 0 && !isGenerating && !insights && (
            <p className="text-xs text-center text-slate-400 mt-2">
              Add some transactions first to generate insights!
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
