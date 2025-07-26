import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SlayXova - All-in-One Social Media Platform',
  description: 'Connect, create, and earn with SlayXova - combining the best features of Snapchat, Discord, OnlyFans, Instagram, and WhatsApp',
  keywords: 'social media, chat, stories, content creation, streaming, messaging',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  )
}