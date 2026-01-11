"use client"

import { TextSelect } from "lucide-react"
import { CircleStop, PlayCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { useUploadRoomAudio } from "../hooks/use-upload-room-audio"
import { RoomChunkForm } from "./room-chunk-form"

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function"

export function FeedRoom() {
  const { id: roomId } = useParams<{ id: string }>()

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { mutateAsync: uploadRoomAudio } = useUploadRoomAudio()

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000
    })

    recorder.current.onstart = () => {
      console.log("Recording started.")
    }

    recorder.current.onstop = () => {
      console.log("Recording stopped.")
    }

    recorder.current.ondataavailable = (ev) => {
      if (ev.data.size > 0) {
        console.log("Audio data available:", ev.data)
        uploadRoomAudio({
          param: { id: roomId },
          form: { audio: new File([ev.data], "audio.webm", { type: "audio/webm" }) }
        })
      }
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Gravação de áudio não é suportada neste navegador.")
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100
      }
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  function stopRecording() {
    setIsRecording(false)
    if (recorder.current && recorder.current.state === "recording") {
      recorder.current.stop()
    }
    clearInterval(intervalRef.current ?? undefined)
  }

  function toggleRecording() {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  if (!roomId) {
    return null
  }

  const Icon = isRecording ? <CircleStop /> : <PlayCircle className="text-red-500" />

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-4 py-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="lg">
            Alimentar sala com Texto <TextSelect />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <RoomChunkForm roomId={roomId} />
        </PopoverContent>
      </Popover>

      <Button size="lg" onClick={toggleRecording} variant={isRecording ? "destructive" : "default"}>
        {isRecording ? "Parar gravação" : "Gravar Áudio"} {Icon}
      </Button>
    </div>
  )
}
