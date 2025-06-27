import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/20/solid";

export default function FAQ() {
  const faqs = [
    {
      question: "Jak długo utrzymuje się opalenizna natryskowa?",
      answer:
        "Opalenizna utrzymuje się zazwyczaj od 5 do 10 dni, w zależności od rodzaju skóry i jej pielęgnacji.",
    },
    {
        question: "Czy opalanie natryskowe jest bezpieczne dla skóry?",
        answer:
          "Tak, jest to bezpieczna metoda, ponieważ nie naraża skóry na szkodliwe promieniowanie UV.",
      },
      {
        question: "Jak przygotować skórę do zabiegu?",
        answer:
          "Przed zabiegiem należy dokładnie oczyścić i złuszczyć skórę oraz unikać stosowania olejków czy balsamów.",
      },
      {
        question: " Czy po zabiegu mogę się kąpać?",
        answer:
          "Przez 8 godzin po zabiegu nie należy się kąpać, aby opalenizna mogła się utrwalić.",
      },
      {
        question: "Czy opalanie natryskowe brudzi ubrania?",
        answer:
          "Bezpośrednio po zabiegu barwnik może pozostawić ślady na ubraniach, ale łatwo je wyprać.",
      },
      {
        question: "Czy mogę wykonać opalanie natryskowe przed ważnym wydarzeniem?",
        answer:
          "Tak, jest to doskonały sposób na uzyskanie zdrowego wyglądu skóry na specjalne okazje.",
      },
    // More questions...
  ];

  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        FAQ - Najczęściej Zadawane Pytania
        </h2>
        <dl className="mt-16 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
              <dt>
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base/7 font-semibold">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                    <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                <p className="text-base/7 text-gray-600">{faq.answer}</p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
}
