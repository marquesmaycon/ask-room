import { Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RoomList } from "@/features/room/components/room-list"

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-sans text-xl font-semibold">Salas públicas</h1>
        <Link href="/dashboard/create-room" className="text-blue-500 underline">
          <Button>
            Crie sua sala
            <Plus />
          </Button>
        </Link>
      </div>
      <RoomList />
    </div>
  )
}
