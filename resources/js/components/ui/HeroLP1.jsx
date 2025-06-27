import React from "react";

// Hero Component
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 pt-14 pb-16 sm:pb-20">
      <img
        alt=""
        src="/photos/2.jpg"
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center text-white">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Like a gold
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl">
            Opalanie natryskowe
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            >
              Zarezerwuj
            </a>
            <a
  href="#"
  className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
  style={{ backgroundColor: '#ff4500' }}
>
  Ton texte ici
</a>
            <a href="#" className="text-sm font-semibold text-white">
              Dowiedz sie wiecej <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}
