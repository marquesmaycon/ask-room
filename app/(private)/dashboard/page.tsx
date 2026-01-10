import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MyRooms } from "@/features/room/components/my-rooms"
import { myRoomsQueryOptions } from "@/features/room/hooks/use-my-rooms"

export default async function DashboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(myRoomsQueryOptions(await headers()))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-3xl font-bold">Minhas salas</h1>
          <Button asChild>
            <Link href="/dashboard/room/create">
              Nova Sala
              <Plus />
            </Link>
          </Button>
        </div>
        <MyRooms />
      </div>
    </HydrationBoundary>
  )
}
