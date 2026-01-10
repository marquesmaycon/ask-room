import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ArrowRight, Info } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RoomDetails } from "@/features/room/components/room-details"
import { RoomForm } from "@/features/room/components/room-form"
import { roomDetailsQueryOptions } from "@/features/room/hooks/use-room-details"
import { getQueryClient } from "@/lib/tanstack-query"

type EditRoomPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params

  const queryClient = getQueryClient()
  const queryOptions = roomDetailsQueryOptions({ param: { id }, headers: await headers() })
  await queryClient.prefetchQuery(queryOptions)

  const room = queryClient.getQueryData(queryOptions.queryKey)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="ml-auto">
        <Button asChild variant="link">
          <Link href={`/room/${id}`}>
            Acessar sala
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="space-y-12">
        <h1 className="font-sans text-2xl">
          Configurar: <span className="font-bold">{room?.name}</span>
        </h1>
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-sans text-xl">
            <Info /> Identificação
          </h3>
          <RoomForm type="edit" />
        </div>
        <div>
          <RoomDetails />
        </div>
      </div>
    </HydrationBoundary>
  )
}
