import type { User } from "better-auth"
import { createMiddleware } from "hono/factory"
import { headers } from "next/headers"

import { auth } from "./auth"

type SessionMiddlewareContext = {
  Variables: {
    user?: User
  }
}

export const sessionMiddleware = createMiddleware<SessionMiddlewareContext>(async (c, next) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  c.set("user", session.user)

  await next()
})
