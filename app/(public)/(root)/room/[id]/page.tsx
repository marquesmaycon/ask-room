import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"

import { RoomPage } from "@/features/room/components/room-page"
import { roomQueryOptions } from "@/features/room/hooks/use-room"
import { auth } from "@/lib/auth"
import { getQueryClient } from "@/lib/tanstack-query"

type RoomRoutePageProps = {
  params: Promise<{ id: string }>
}

export default async function RoomRoutePage({ params }: RoomRoutePageProps) {
  const { id } = await params
  const session = await auth.api.getSession({ headers: await headers() })

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(roomQueryOptions({ param: { id } }))

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoomPage isAdmin={isAdmin} />
    </HydrationBoundary>
  )
}
