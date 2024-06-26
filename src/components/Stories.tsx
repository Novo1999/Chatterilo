const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eleanor',
  'Fiona',
  'George',
  'Hannah',
  'Isaac',
  'Jane',
]

const Stories = () => {
  return (
    <section className='text-slate-200 p-2 bg-[#2E4756]'>
      <h1 className='p-bold-20 text-slate-100'>Stories</h1>
      <div className='flex flex-row gap-4 story-section overflow-scroll mt-2'>
        {names.map((name, index) => (
          <div
            className='bg-gray-200 text-slate-800 shadow-md h-40 min-w-32 rounded-md flex justify-end items-end p-3'
            key={index}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stories
