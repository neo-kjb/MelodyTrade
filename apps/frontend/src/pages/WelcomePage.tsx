import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32 text-center md:text-left">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="flex flex-wrap items-center">
            <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/126.jpg"
                alt="Trendy Pants and Shoes"
                className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              />
            </div>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
              <div className="px-6 py-12 md:px-12">
                <h2 className="mb-6 pb-2 text-3xl font-bold">
                  Welcome To Melody Trade
                </h2>
                <p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300">
                  Discover a world of musical exchange at your fingertips.
                  Melody Trade is your platform for swapping musical treasures
                  with fellow enthusiasts. Whether you're seeking to expand your
                  collection or share the rhythm of your favorite tunes, you're
                  in the right place.
                </p>

                <Link
                  to={'/disks'}
                  type="button"
                  className="inline-block rounded bg-neutral-800 px-12 pt-3.5 pb-3 text-sm font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-50 dark:text-neutral-800 dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Browse Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
