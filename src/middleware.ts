import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const token = req.auth
  const path = req.nextUrl.pathname

  if (path.startsWith("/dashboard/client") && token?.user?.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (path.startsWith("/dashboard/inspector") && token?.user?.role !== "INSPECTOR") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (path.startsWith("/dashboard/admin") && token?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
