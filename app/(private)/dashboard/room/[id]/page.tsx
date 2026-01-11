import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"

import { RoomConfig } from "@/features/room/components/room-config"
import { roomDetailsQueryOptions } from "@/features/room/hooks/use-room-details"
import { getQueryClient } from "@/lib/tanstack-query"

type EditRoomPageProps = {
  params: Promise<{ id: string }>
}

export default async function RoomConfigPage({ params }: EditRoomPageProps) {
  const { id } = await params

  const queryClient = getQueryClient()
  const queryOptions = roomDetailsQueryOptions({ param: { id }, headers: await headers() })
  await queryClient.prefetchQuery(queryOptions)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoomConfig id={id} />
    </HydrationBoundary>
  )
}
