import React from "react";

import { IoFilterOutline } from "react-icons/io5";

function FilterDropdown({filter,setStatus,setFilter,setPage}) {
  return (
    <div className="relative">
      <IoFilterOutline
        onClick={() => setFilter((prev) => !prev)}
        className="text-2xl cursor-pointer"
      />

      {filter && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 p-2 z-10">
          <button
            onClick={() => {
              setStatus("");
              setFilter(false);
              setPage(1);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            All
          </button>

          <button
            onClick={() => {
              setStatus("pending");
              setFilter(false);
              setPage(1);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            Pending
          </button>

          <button
            onClick={() => {
              setStatus("in-progress");
              setFilter(false);
              setPage(1);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            In Progress
          </button>

          <button
            onClick={() => {
              setStatus("completed");
              setFilter(false);
              setPage(1);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
