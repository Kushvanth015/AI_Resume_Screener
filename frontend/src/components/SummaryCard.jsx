import React from "react";

const SummaryCard = ({ summary }) => {

  return (

    <div className="bg-zinc-900 p-6 rounded-3xl mt-6">

      <h2 className="text-2xl font-bold mb-4 text-cyan-400">
        AI Resume Summary
      </h2>

      <p className="text-zinc-300 leading-8">
        {summary}
      </p>

    </div>
  );
};

export default SummaryCard;