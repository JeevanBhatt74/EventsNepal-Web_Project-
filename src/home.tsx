import napathey from "./assets/Napathey.png";
import concert from "./assets/Concert.png";
import bgImage from "./assets/BG Image.png";

const blogs = [
  {
    date: "10 FEB 2023",
    author: "JOHN DOE",
    title: "Corporate Events",
    description:
      "Effortlessly plan and execute professional corporate events tailored to your business goals.",
    img: "/2.jpeg",
  },
  {
    date: "7 JUN 2023",
    author: "MARK ADAIR",
    title: "Cultural Events",
    description:
      "Bring traditions to life with expertly organized and vibrant cultural events.",
    img: "/1.jpeg",
  },
  {
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    title: "Music Events",
    description:
      "Experience unforgettable moments with flawlessly organized music events and concerts.",
    img: "/3.jpeg",
  },
];

export default function Home() {
  return (
    <main className="">
      <section>
        <section className="relative min-h-[35rem] gap-6 flex overflow-hidden text-white p-10 bg-gradient-to-tr from-purple-800 to-purple-400 container mx-auto my-10 rounded-3xl">
          <img
            src={bgImage}
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
          <main className="space-y-6 flex-1 relative z-10">
            <h1 className="text-5xl font-bold mt-20">
              Where Your <span className="text-sky-300">Event</span> Dreams Come
              to Life!
            </h1>
            <p className="">
              Events Nepal is your one-stop solution for planning and managing
              events effortlessly. Whether you're organizing a wedding,
              corporate gathering, or cultural celebration, we connect you with
              the best venues, vendors, and services across Nepal.
            </p>
          </main>
          <aside className="flex-1"></aside>
        </section>
      </section>

      <section id="about" className="container mx-auto flex gap-20 my-32 mb-72">
        <main className="space-y-4 flex-1">
          <h3 className="text-4xl font-bold">
            About <br /> <span className="font-thin">Events Nepal</span>
          </h3>
          <p className="text-lg text-slate-500">
            Events Nepal specializes in transforming your visions into
            unforgettable experiences. Located in the heart of Kathmandu, we
            provide comprehensive event management solutions for weddings,
            corporate events, cultural celebrations, and more. Our expert team
            is dedicated to honoring Nepal's rich traditions while seamlessly
            integrating modern trends.{" "}
          </p>
        </main>
        <aside className="flex-1 relative">
          <img src={concert} />
          <img
            src={napathey}
            className="absolute top-1/2 translate-x-1/2 right-1/2"
          />
        </aside>
      </section>

      <section id="services" className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            Services
          </h2>
        </div>
        <section className="flex gap-10 container mx-auto">
          {blogs.map((blog, index) => (
            <div
              className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300"
              key={index}
            >
              <img
                src={blog.img}
                alt="Blog Post 2"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                {/* <span className="text-sm block text-gray-400 mb-2">
                  {blog.date}
                </span> */}
                <h3 className="text-xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <hr className="my-4" />
                <p className="text-gray-400 text-sm">{blog.description}</p>
              </div>
            </div>
          ))}
        </section>
      </section>
      <footer className="text-center mt-24 border-slate-200 border-t py-8 text-sm text-slate-400">
        &copy; 2024 Carefully crafted Content with ❤️ by Jeevan Raj Kapadi
        Bhatt.
      </footer>
    </main>
  );
}
