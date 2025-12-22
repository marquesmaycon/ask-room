import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <Skeleton className="mb-8 h-8 w-1/3" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, index) => (
          <Skeleton className="min-h-44" key={index} />
        ))}
      </div>
    </div>
  )
}
