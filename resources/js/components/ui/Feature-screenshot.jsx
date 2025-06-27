import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Szybki efekt.',
    description:
      'Efekt opalenizny jest widoczny natychmiast po aplikacji i osiąga pełną intensywność w ciągu kilku godzin.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Bezpieczeństwo dla skóry.',
    description: 'Unikasz szkodliwego promieniowania UV, które może prowadzić do starzenia się skóry i zwiększa ryzyko raka skóry.',
    icon: LockClosedIcon,
  },
  {
    name: 'Równomierna opalenizna.',
    description: 'Profesjonalne opalanie natryskowe zapewnia równomierną aplikację bez smug i plam.',
    icon: ServerIcon,
  },
  {
    name: 'Idealne na specjalne okazje.',
    description: 'Szybka metoda uzyskania pięknej opalenizny na wesele, imprezę czy sesję zdjęciową.',
    icon: ServerIcon,
  },
  {
    name: 'Nawilżenie skóry.',
    description: 'Wiele preparatów do opalania natryskowego zawiera składniki nawilżające, które wspomagają pielęgnację skóry.',
    icon: ServerIcon,
  },
  {
    name: 'Brak ryzyka poparzeń słonecznych.',
    description: 'Skóra nie jest narażona na działanie słońca, dzięki czemu nie ma ryzyka poparzeń.',
    icon: ServerIcon,
  },
]

export default function Example() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Szybki Sposób na Zdrową Opaleniznę</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Opalanie Natryskowe
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
              Opalanie natryskowe to bezpieczna i szybka metoda uzyskania pięknej, równomiernej opalenizny bez konieczności wystawiania skóry na szkodliwe promieniowanie UV. Jest to idealne rozwiązanie dla osób, które chcą cieszyć się zdrowym kolorem skóry, unikając ryzyka poparzeń słonecznych i przedwczesnego starzenia się skóry.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
                <p class="mt-8">Opalenizna utrzymuje się zwykle od 5 do 10 dni, w zależności od pielęgnacji skóry.

Przed zabiegiem warto dokładnie oczyścić i złuszczyć skórę, aby zapewnić równomierny efekt. Po aplikacji należy unikać kontaktu z wodą przez kilka godzin, aby opalenizna mogła się utrwalić.</p>
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://lh3.googleusercontent.com/p/AF1QipNyHelKnhBf0IxxnWst8yUmdNvWZrCYuzlgploz=s1360-w1360-h1020-rw"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}