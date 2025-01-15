import Header from '@/components/shared/Header'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full'>
      <Header/>
      <div className='mx-12 mb-24'>
          <div>
              {children}
          </div>
      </div>
    </main>
  )
}

export default layout