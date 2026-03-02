export default function MovieCardSkeleton() {
  return (
    <div className="bg-black/70 rounded-xl border border-white/10 animate-pulse">
      <div className="w-full h-64 bg-gray-800 rounded-t-xl"></div>

      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-700 rounded w-12"></div>
          <div className="h-8 bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}