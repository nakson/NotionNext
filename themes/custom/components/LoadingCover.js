export default function LoadingCover () {
  return (
    <div
      id='loading-cover'
      className='cyber-loading-cover md:-mt-20 flex-grow flex flex-col justify-center z-50 w-full h-screen container mx-auto cyber-mono animate__animated animate__fadeIn'>
      <div className='mx-auto text-center text-[color:var(--cyber-text)]'>
        <div className='text-[11px] text-[color:var(--cyber-text-muted)] mb-3 tracking-widest'>
          LOADING_MODULE
        </div>
        <i className='fas fa-spinner animate-spin text-2xl text-[color:var(--cyber-neon-cyan)]' />
        <div className='cyber-boot-bar mx-auto' />
      </div>
    </div>
  )
}
