import { hc } from "hono/client"

import type { AppType } from "@/app/api/[...route]/route"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const client = hc<AppType>(baseURL, { init: { credentials: "include" } })