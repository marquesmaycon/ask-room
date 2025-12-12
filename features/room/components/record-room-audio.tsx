"use client"

import { CircleStop, Play, PlayCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"

import { useUploadRoomAudio } from "../hooks/use-upload-room-audio"

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function"

export function RecordRoomAudio() {
  const { id: roomId } = useParams<{ id: string }>()
  console.log({ roomIdClient: roomId })
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

  const Icon = isRecording ? <CircleStop /> : <PlayCircle />

  return (
    <div className="">
      <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "default"}>
        {isRecording ? "Parar gravação" : "Gravar Áudio"} {Icon}
      </Button>
    </div>
  )
}
