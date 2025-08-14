function Contributions({ people }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl sm:text-4xl text-center mb-8">Contributors</h2>
      <div className="flex flex-wrap justify-center gap-[3rem] sm:gap-[5rem] max-w-6xl mx-auto">
        {people.map((person, index) => (
          <a href={person.url}>
            <div key={index} className="flex flex-col items-center">
            <img
              src={person.image}
              alt={person.name}
              className="w-17 h-17 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
            <p className="text-[15px] mt-2">{person.name}</p>
          </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contributions;
