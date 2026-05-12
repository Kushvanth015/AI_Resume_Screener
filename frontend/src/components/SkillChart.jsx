import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const SkillChart = ({ data }) => {

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Skill Analytics
      </h2>

      <ResponsiveContainer width="100%" height={400}>

        <BarChart data={data}>

          <XAxis dataKey="skill" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;