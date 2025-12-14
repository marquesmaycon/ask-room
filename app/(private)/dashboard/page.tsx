import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { headers } from "next/headers"

import { MyRooms } from "@/features/room/components/my-rooms"
import { myRoomsQueryOptions } from "@/features/room/hooks/use-my-rooms"

export default async function DashboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(myRoomsQueryOptions(await headers()))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyRooms />
    </HydrationBoundary>
  )
}
