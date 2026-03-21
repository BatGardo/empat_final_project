import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import StartButton from '../components/start-button/StartButton';

const HomePage = () => {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="font-text-default bg-bg-violet grid h-[calc(100vh-64px)] content-center px-5 text-center lg:px-30">
        <div className="mb-6 flex justify-center space-x-[42px]">
          <div className="mb-6 flex items-center gap-6">
            <img
              src="/vehicles/airplaine.svg"
              alt="Airplane"
              className="h-[100px] w-[100px]"
            />
            <img
              src="/vehicles/ship.svg"
              alt="Ship"
              className="h-[100px] w-[100px]"
            />
            <img
              src="/vehicles/old-train.svg"
              alt="Train"
              className="h-[100px] w-[100px]"
            />
            <img
              src="/vehicles/bike.svg"
              alt="Bike"
              className="h-[100px] w-[100px]"
            />
          </div>
        </div>

        <div>
          <h1 className="pb-[42px] text-[32px] font-bold lg:text-5xl">
            Organize Group Travel Faster <br /> With Baza Grunt Osnova
          </h1>

          <p className="mb-8 max-w-[590px] justify-self-center text-base lg:text-2xl">
            The essential tool for organizing shared trips.
            <br />
            Create a group, share the invite link, and manage tasks and expenses
            together in one place.
          </p>

          <StartButton />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
