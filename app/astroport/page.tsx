export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 id="astroport-name">Hidden Face Gataway</h1>

        <section id="gate-1">
          <h2>Gate 1</h2>

          <label id="ship-1"></label>
        </section>

        <section id="gate-2">
          <h2>Gate 2</h2>

          <label id="ship-2"></label>
        </section>

        <section id="gate-3">
          <h2>Gate 3</h2>
          <label id="ship-3"></label>
        </section>

        <input id="ship" />
        <button type="button" id="dock">
          Dock
        </button>
      </main>
    </div>
  );
}
