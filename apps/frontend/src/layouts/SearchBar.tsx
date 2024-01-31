import React from 'react';

export default function SearchBar(props: { query: (value: string) => void }) {
  const { query } = props;
  return (
    <div className="mb-3">
      <input
        type="search"
        onChange={(e) => query(e.target.value)}
        className="mx-auto relative m-0 block w-2/4 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-200 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        id="search"
        placeholder="Search..."
      />
    </div>
  );
}
