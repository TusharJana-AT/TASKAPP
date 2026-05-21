import React from "react";

function Pagination({page,setPage,totalPages}) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-8 px-6 py-3 rounded-xl">
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        Prev
      </button>
      <h1>{page}</h1>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
