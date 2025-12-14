import { RoomForm } from "@/features/room/components/room-form"

export default function CreateRoomPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-sans text-xl font-semibold">Crie uma nova sala</h1>
      </div>
      <RoomForm />
    </div>
  )
}
