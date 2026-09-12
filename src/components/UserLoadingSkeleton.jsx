function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-3 rounded-xl animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-zinc-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-3.5 bg-zinc-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-100 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
export default UsersLoadingSkeleton;