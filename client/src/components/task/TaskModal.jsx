import React from "react";

function TaskModal({openModal,selectedTask,setOpenModal}) {
  return (
    <>
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>

            <p className="text-gray-700 mb-5">{selectedTask.description}</p>

            <button
              onClick={() => setOpenModal(false)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskModal;
