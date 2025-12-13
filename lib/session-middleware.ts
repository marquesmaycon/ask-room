import type { User } from "better-auth"
import { createMiddleware } from "hono/factory"

import { auth } from "./auth"

type SessionMiddlewareContext = {
  Variables: {
    user?: User
  }
}

export const sessionMiddleware = createMiddleware<SessionMiddlewareContext>(async (c, next) => {
  const session = await auth.api.getSession()

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  c.set("user", session?.user)

  await next()
})
