import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import "styles/epic-redesign.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  applicationName: "EPIC Technology",
  description: "Advanced technology for Vietnam: robotics, education systems and industrial vision. EPIC Technology demo.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
