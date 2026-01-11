import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RoomList } from "@/features/room/components/rooms-list"
import { roomsQueryOptions } from "@/features/room/hooks/use-rooms"

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(roomsQueryOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-sans text-xl font-semibold">Salas públicas</h1>
          <Button asChild>
            <Link href="/dashboard/create-room">
              Crie sua sala
              <Plus />
            </Link>
          </Button>
        </div>
        <RoomList />
      </div>
    </HydrationBoundary>
  )
}
