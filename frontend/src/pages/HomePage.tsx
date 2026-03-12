import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const HomePage = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Welcome to Baza Grunt Osnova
          </p>

          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Our final project
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            expedita placeat, corporis reiciendis illum pariatur accusamus
            magnam consequatur neque at.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:opacity-90">
              Почати роботу
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100">
              Дізнатись більше
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-[320px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 text-gray-500">
            <ImageOutlinedIcon sx={{ fontSize: 72 }} />
            <p className="mt-3 text-sm">image</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
