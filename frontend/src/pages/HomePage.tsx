import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import StartButton from '../components/start-button/StartButton';
import expensesPreview from '../assets/images/expenses.webp';
import CardFeature from '../components/card-feature/CardFeature';
import Steps from '../components/steps/Steps';
import Reviews from '../components/reviews/Reviews';
import dashboard from '../assets/images/dashboard.webp';
import Faq from '../components/faq/Faq';

const HomePage = () => {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="text-headings bg-bg-violet grid h-[calc(100vh-64px)] content-center px-5 text-center md:px-30">
        <div className="mb-3 flex items-center justify-center gap-3 md:mb-6 md:gap-8">
          <img
            src="/vehicles/airplaine.svg"
            alt="Airplane"
            className="h-auto w-full max-w-[50px] object-contain md:max-w-[100px]"
          />
          <img
            src="/vehicles/ship.svg"
            alt="Ship"
            className="h-auto w-full max-w-[50px] object-contain md:max-w-[100px]"
          />
          <img
            src="/vehicles/old-train.svg"
            alt="Train"
            className="h-auto w-full max-w-[50px] object-contain md:max-w-[100px]"
          />
          <img
            src="/vehicles/bike.svg"
            alt="Bike"
            className="h-auto w-full max-w-[50px] object-contain md:max-w-[100px]"
          />
        </div>

        <div>
          <h1 className="pb-6 text-[32px] font-bold md:pb-10.5 lg:text-5xl">
            Organize Group Travel Faster <br /> With Baza Grunt Osnova
          </h1>

          <p className="mb-8 max-w-[590px] justify-self-center text-base text-balance lg:text-2xl">
            The essential tool for organizing shared trips. Create a group,
            share the invite link, and manage tasks and expenses together in one
            place.
          </p>

          <StartButton />
        </div>
      </section>

      {/*About*/}
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-between bg-white px-5 py-16 md:px-30 lg:py-0">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 lg:flex-row lg:items-stretch">
          <div className="w-full space-y-6 lg:w-1/2">
            <h2 className="text-headings text-2xl font-bold md:text-4xl">
              Replace Spreadsheets
              <br className="hidden md:block" />
              and Group Chats
            </h2>

            <div className="space-y-4">
              <p className="text-text-neutral mb-4 text-lg font-light md:text-xl">
                Organizing a trip with multiple people usually means lost links,
                confusing text threads, and manual math.
              </p>
              <p className="text-text-neutral mb-8 text-lg font-light md:text-xl">
                Baza Grunt Osnova removes the chaos by putting your tasks,
                deadlines, and shared expenses in one strictly organized
                dashboard.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <img
                  src="/icons/user.svg"
                  alt=""
                  className="mt-1 h-6 w-6 shrink-0"
                />
                <p className="text-text-neutral text-lg md:text-xl">
                  <span className="text-primary font-bold">User Friendly.</span>{' '}
                  The interface is clean, allowing anyone in your group to
                  immediately understand how use it.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src="/icons/total.svg"
                  alt=""
                  className="mt-1 h-6 w-6 shrink-0"
                />
                <p className="text-text-neutral text-lg md:text-xl">
                  <span className="text-primary font-bold">
                    Total Accountability.
                  </span>{' '}
                  Everyone sees the todo list and who is responsible for each
                  item.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src="/icons/finance.svg"
                  alt=""
                  className="mt-0.5 h-5 w-5"
                />
                <p className="text-text-neutral text-lg md:text-xl">
                  <span className="text-primary font-bold">
                    Financial Clarity.
                  </span>{' '}
                  The system calculates exactly who owes what, automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-1/2">
            <img
              src={expensesPreview}
              alt="Expenses Feature"
              className="h-full w-full rounded-xl object-cover object-left-top shadow-md"
            />
          </div>
        </div>
      </section>

      <CardFeature />
      <Steps />
      <Reviews />

      {/*Start planning*/}
      <section className="bg-gray-50 px-5 py-16 md:px-30">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:flex-row">
            <div className="order-2 flex flex-1 flex-col items-center justify-center p-10 text-center md:order-1 md:items-start md:p-16 md:text-left lg:p-20">
              <h2 className="font-headings mb-4 text-2xl font-bold text-gray-900 md:text-4xl">
                Try Right Now
              </h2>
              <p className="mb-8 max-w-md text-lg leading-relaxed font-light text-gray-600 md:text-xl">
                Spend less time organizing lists, and more time enjoying your
                actual travel.
              </p>
              <StartButton />
            </div>

            <div className="order-1 flex-1 md:order-2">
              <img
                src={dashboard}
                alt="App Preview"
                className="h-full w-full object-cover object-left-top"
              />
            </div>
          </div>
        </div>
      </section>

      <Faq />

      <Footer />
    </>
  );
};

export default HomePage;
