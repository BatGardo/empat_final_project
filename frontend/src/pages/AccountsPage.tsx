const AccountsPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-6 text-4xl font-bold">Витрати</h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        Це сторінка де можна переглянути витрати та борги.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Особисті витрати</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Групові витрати</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Борги</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccountsPage;