function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 rounded-xl animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-zinc-400 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-zinc-400 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-400 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
export default UsersLoadingSkeleton;