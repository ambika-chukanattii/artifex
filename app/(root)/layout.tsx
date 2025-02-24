import Header from '@/components/shared/Header'
import MobileNav from '@/components/shared/MobileNav'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full mb-24'>
      <Header/>
      <MobileNav/>
      <div>
          <div>
              {children}
          </div>
      </div>
    </main>
  )
}

export default layout