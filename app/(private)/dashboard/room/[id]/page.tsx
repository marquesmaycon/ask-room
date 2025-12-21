import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"

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
      <RoomForm type="edit" />
    </HydrationBoundary>
  )
}
