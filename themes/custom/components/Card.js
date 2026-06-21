const Card = ({ children, headerSlot, className }) => {
  return (
    <div className={className}>
      <>{headerSlot}</>
      <section className='card lg:p-6 p-4 text-[color:var(--cyber-text)]'>
        {children}
      </section>
    </div>
  )
}
export default Card
