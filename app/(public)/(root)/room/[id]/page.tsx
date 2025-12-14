import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { RoomPage } from "@/features/room/components/room-page"
import { roomQueryOptions } from "@/features/room/hooks/use-room"
import { getQueryClient } from "@/lib/tanstack-query"

export default async function RoomRoutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(roomQueryOptions({ param: { id } }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoomPage />
    </HydrationBoundary>
  )
}
