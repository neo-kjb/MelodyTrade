import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="flex flex-wrap items-center">
          <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/126.jpg"
              alt="Headset"
              className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
            />
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
            <div className="px-6 py-12 md:px-12">
              <h2 className="mb-6 pb-2 text-3xl font-bold">
                Welcome To Melody Trade
              </h2>
              <p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300">
                Discover a world of musical exchange at your fingertips. Melody
                Trade is your platform for swapping musical treasures with
                fellow enthusiasts. Whether you're seeking to expand your
                collection or share the rhythm of your favorite tunes, you're in
                the right place.
              </p>

              <Link
                to={'/disks'}
                type="button"
                className="bg-transparent uppercase  hover:bg-dark-500 text-dark-700 font-semibold hover:text-white py-2 px-4 border border-dark-500 hover:border-transparent rounded"
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
  );
}
