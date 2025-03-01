export default function LoadingQuiz() {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mb-4"></div>
        <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-slate-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

