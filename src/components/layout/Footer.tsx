

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {year} PocketTrack. Smart Financial Management.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
