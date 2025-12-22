import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <Skeleton className="mb-8 h-8 w-1/3" />
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  )
}
