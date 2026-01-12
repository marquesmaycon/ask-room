import type { Session, User } from "better-auth"
import { createMiddleware } from "hono/factory"

import { auth } from "./auth"

type SessionMiddlewareContext = {
  Variables: {
    user: User | null
    session: Session | null
    isAdmin: boolean
  }
}

export const sessionMiddleware = createMiddleware<SessionMiddlewareContext>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set("user", null)
    c.set("session", null)
    c.set("isAdmin", false)
    await next()
    return
  }

  c.set("user", session.user)
  c.set("session", session.session)
  c.set("isAdmin", session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)

  await next()
})

export const authMiddleware = createMiddleware<SessionMiddlewareContext>(async (c, next) => {
  const user = c.get("user")

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  await next()
})
