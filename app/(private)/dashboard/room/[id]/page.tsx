import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { RoomConfig } from "@/features/room/components/room-config"
import { roomDetailsQueryOptions } from "@/features/room/hooks/use-room-details"
import { auth } from "@/lib/auth"
import { getQueryClient } from "@/lib/tanstack-query"

type EditRoomPageProps = {
  params: Promise<{ id: string }>
}

export default async function RoomConfigPage({ params }: EditRoomPageProps) {
  const { id } = await params
  const session = await auth.api.getSession({ headers: await headers() })

  const queryClient = getQueryClient()
  const queryOptions = roomDetailsQueryOptions({ param: { id }, headers: await headers() })
  await queryClient.prefetchQuery(queryOptions)

  const room = queryClient.getQueryData(queryOptions.queryKey)

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL

  if (session?.user?.id !== room?.userId && !isAdmin) {
    redirect("/")
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoomConfig id={id} />
    </HydrationBoundary>
  )
}
