import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RoomList } from "@/features/room/components/room-list"

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-sans text-3xl">Ask Room</h1>
        <Link href="/room/create" className="text-blue-500 underline">
          <Button>Create your room</Button>
        </Link>
      </div>
      <RoomList />
    </div>
  )
}
