import { Hono } from "hono"
import { handle } from "hono/vercel"

import chunksController from "@/features/chunks/server/route"
import questionsController from "@/features/questions/server/route"
import roomsController from "@/features/room/server/route"
import { auth } from "@/lib/auth"

const app = new Hono().basePath("/api")

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))

const routes = app
  .route("/rooms", roomsController)
  .route("/questions", questionsController)
  .route("/chunks", chunksController)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
