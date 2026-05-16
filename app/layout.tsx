import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cartógrafo Veritas',
  description: 'Mapeando la verdad del mundo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
