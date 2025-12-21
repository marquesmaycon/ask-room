import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"

import { RoomDetails } from "@/features/room/components/room-details"
import { RoomForm } from "@/features/room/components/room-form"
import { roomDetailsQueryOptions } from "@/features/room/hooks/use-room-details"
import { getQueryClient } from "@/lib/tanstack-query"

type RoomEditPageProps = {
  params: Promise<{ id: string }>
}

export default async function RoomEditPage({ params }: RoomEditPageProps) {
  const { id } = await params

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    roomDetailsQueryOptions({ param: { id }, headers: await headers() })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-12">
        <RoomForm type="edit" />
        <RoomDetails />
      </div>
    </HydrationBoundary>
  )
}
