function FeaturesGrid({ children }) {
  return (
    <>
      <h1 className="md:hidden py-5 text-center text-xl font-bold">Features</h1>
      <div className="grid h-full w-full grid-rows-12 gap-6 md:grid-cols-3 md:grid-rows-8">
          <h1 className="max-md:hidden flex items-end justify-center text-xl font-bold md:col-start-1 md:row-start-1 md:row-end-1 md:text-3xl">
            Features
          </h1>
        {children}
      </div>
    </>
  )
}

export default FeaturesGrid
