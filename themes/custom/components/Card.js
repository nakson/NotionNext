const Card = ({ children, headerSlot, className }) => {
  return (
    <div className={className}>
      <>{headerSlot}</>
      <section className='card dark:text-gray-300 lg:p-6 p-4'>
        {children}
      </section>
    </div>
  )
}
export default Card
