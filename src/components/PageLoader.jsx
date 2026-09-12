import { LoaderIcon } from "lucide-react";
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <LoaderIcon className="size-10 animate-spin text-accent-600" />
    </div>
  );
}
export default PageLoader;