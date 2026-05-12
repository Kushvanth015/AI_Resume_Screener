import React from "react";

const RankingTable = ({ candidates }) => {

  return (
    <div className="mt-10 overflow-x-auto">

      <table className="w-full bg-zinc-900 rounded-3xl overflow-hidden">

        <thead className="bg-cyan-500 text-black">
          <tr>
            <th className="p-4">Rank</th>
            <th className="p-4">Candidate</th>
            <th className="p-4">Match Score</th>
            <th className="p-4">Skills</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate, index) => (
            <tr
              key={index}
              className="border-b border-zinc-700"
            >
              <td className="p-4">#{index + 1}</td>
              <td className="p-4">{candidate.name}</td>
              <td className="p-4">
                {candidate.match_score}%
              </td>
              <td className="p-4">
                {candidate.skills.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;