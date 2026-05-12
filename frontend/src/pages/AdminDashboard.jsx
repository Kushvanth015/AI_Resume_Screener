import React from "react";

const AdminDashboard = () => {

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2>Total Resumes</h2>
          <p className="text-4xl mt-4">120</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2>Shortlisted</h2>
          <p className="text-4xl mt-4">45</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2>Top Score</h2>
          <p className="text-4xl mt-4">98%</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2>Total Users</h2>
          <p className="text-4xl mt-4">20</p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;