import React from "react";
import { CloudArrowUpIcon, LockClosedIcon, ArrowPathIcon, FingerPrintIcon, Cog6ToothIcon, ServerIcon } from '@heroicons/react/20/solid';

// Features Component
export default function Features() {
  const features = [
    {
      name: 'Push to deploy.',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'SSL certificates.',
      description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      icon: LockClosedIcon,
    },
    {
      name: 'Simple queues.',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
      icon: ArrowPathIcon,
    },
    {
      name: 'Advanced security.',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
      icon: FingerPrintIcon,
    },
    {
      name: 'Powerful API.',
      description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      icon: Cog6ToothIcon,
    },
    {
      name: 'Database backups.',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
      icon: ServerIcon,
    },
  ];

  return (
    <section className="mt-32 sm:mt-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold text-indigo-600">Dlaczego warto wybrac</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Opalanie natryskowe</p>
          <p className="mt-6 text-lg text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            alt="App screenshot"
            src="/photos/collage6.jpg"
            width={2432}
            height={1442}
            className="mb-12 rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon className="absolute top-1 left-1 h-6 w-6 text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="inline text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
