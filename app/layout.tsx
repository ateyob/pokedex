import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/theme-provider'
import Navbar from './components/navbar'
import getCurrentUser from './actions/getCurrentUser'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Toasterovider from './providers/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokeDex Management Dashboard',
  description: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  
  console.log({currentUser})

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="sticky top-0 z-50">
            <Toasterovider />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </div>
          <main className="flex min-h-screen flex-col items-center py-6 px-2">
            <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
              {/* <Link href="/"><h2 className="text-2xl text-bold">PokemonFinder</h2></Link> */}
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

