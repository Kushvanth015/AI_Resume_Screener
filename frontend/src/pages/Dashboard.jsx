import React, {
  useState
} from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {

  const [filterStatus, setFilterStatus] =
    useState("ALL");

  const [jobDescription, setJobDescription] =
    useState("");

  const [selectedFiles, setSelectedFiles] =
    useState([]);

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [chatResponse, setChatResponse] =
    useState("");

  // Select Multiple Resumes
  const handleFileSelection = (event) => {

    const files = Array.from(
      event.target.files
    );

    setSelectedFiles(files);

    console.log(files);
  };

  // Download PDF Report
  const downloadReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "AI Resume Screening Report",
      14,
      20
    );

    const tableColumn = [
      "Candidate",
      "ATS Score",
      "Status",
      "Skills",
    ];

    const tableRows = [];

    candidates.forEach((candidate) => {

      const rowData = [
        candidate.name,
        `${candidate.score}%`,
        candidate.status,
        candidate.skills.join(", "),
      ];

      tableRows.push(rowData);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("ATS_Report.pdf");
  };

  // Analyze Resumes
  const analyzeResumes = async () => {

    if (!selectedFiles.length) {

      alert("Please upload resumes");

      return;
    }

    if (!jobDescription) {

      alert(
        "Please enter Job Description"
      );

      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      // Append resumes
      selectedFiles.forEach((file) => {

        formData.append(
          "resumes",
          file
        );
      });

      // Append JD
      formData.append(
        "job_description",
        jobDescription
      );

      const response = await fetch(
        "https://kushvanth05-ai-resume-screener.hf.space/analyze-resumes",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setCandidates(
        data.candidates || []
      );

    } catch (error) {

      console.log(error);

      alert("Analysis Failed");

    } finally {

      setLoading(false);
    }
  };

  // Counts
  const shortlistedCount =
    candidates.filter(
      (c) => c.status === "Shortlisted"
    ).length;

  const reviewCount =
    candidates.filter(
      (c) => c.status === "Review"
    ).length;

  const rejectedCount =
    candidates.filter(
      (c) => c.status === "Rejected"
    ).length;

  const notShortlistedCount =
    candidates.filter(
      (c) => c.status !== "Shortlisted"
    ).length;

  const topScore =
    candidates.length > 0
      ? Math.max(
        ...candidates.map(
          (c) => c.score
        )
      )
      : 0;

  // Ask Chatbot    
  const askChatbot = async () => {

    if (!query) return;

    const response = await fetch(
      "https://kushvanth05-ai-resume-screener.hf.space/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          query,
        }),
      }
    );

    const data = await response.json();

    setChatResponse(
      data.response
    );
  };

  // Pie Chart Data
  const pieData = [
    {
      name: "Shortlisted",
      value: shortlistedCount,
    },
    {
      name: "Review",
      value: reviewCount,
    },
    {
      name: "Rejected",
      value: rejectedCount,
    },
  ];

  // Bar Chart Data
  const barData = candidates.map(
    (candidate) => ({
      name: candidate.name.substring(0, 10),
      score: candidate.score,
    })
  );

  // Filtered Candidates for Table
  const filteredCandidates =
    filterStatus === "ALL"

      ? candidates

      : candidates.filter(
        (candidate) =>

          candidate.status ===
          filterStatus
      );

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

        <div>

          <h1 className="text-6xl font-bold text-cyan-400">
            AI Resume Screener
          </h1>

          <p className="text-zinc-400 mt-3 text-xl">
            Real ATS Resume Analysis
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Upload Button */}
          <label className="bg-cyan-500 hover:bg-cyan-600 px-6 py-4 rounded-2xl cursor-pointer font-semibold transition-all">

            Upload Resumes

            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelection}
            />

          </label>

          {/* Analyze Button */}
          <button
            onClick={analyzeResumes}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 px-6 py-4 rounded-2xl font-semibold transition-all flex items-center gap-3"
          >

            {
              loading ? (

                <>

                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                  Analyzing Resumes...

                </>

              ) : (

                "Analyze Resumes"
              )
            }

          </button>
        </div>

      </div>

      {/* Download Report Button */}
      <div className="mb-8">

        <button
          onClick={downloadReport}
          className="
    bg-yellow-500
    hover:bg-yellow-600
    px-6
    py-4
    rounded-2xl
    font-semibold
    transition-all
    "
        >

          Download Report

        </button>

      </div>

      {/* Job Description */}
      <div className="mb-10">

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          className="w-full h-[220px] bg-zinc-900 border border-zinc-800 rounded-3xl p-6 outline-none text-lg"
        />

      </div>

      { /* AI HR Assistant */}
      <div className="
      mt-10
      mb-12
      bg-zinc-900
      p-8
      rounded-3xl
      border
      border-zinc-800
      ">

        <h2 className="text-3xl font-bold text-cyan-400 mb-6">

          AI HR Assistant

        </h2>

        <div className="
        flex
        gap-4
        items-center
       ">

          <input
            type="text"
            placeholder="
      Ask AI HR Assistant...
      "
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="
      flex-1
      bg-zinc-800
      p-4
      rounded-2xl
      outline-none
      "
          />

          <button
            onClick={askChatbot}
            className="
  bg-cyan-500
  hover:bg-cyan-600
  min-w-[140px]
  h-16
  rounded-2xl
  text-xl
  font-bold
  transition-all
  duration-300
  "
          >

            Ask

          </button>

        </div>

        {
          chatResponse && (

            <div className="
      mt-6
      bg-zinc-800
      p-5
      rounded-2xl
      ">

              {chatResponse}

            </div>
          )
        }

      </div>

      {/* Selected Files */}
      {
        selectedFiles.length > 0 && (

          <div className="bg-zinc-900 p-6 rounded-3xl mb-10 border border-zinc-800">

            <h2 className="text-2xl font-bold mb-5 text-cyan-400">

              Selected Resumes

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {
                selectedFiles.map(
                  (file, index) => (

                    <div
                      key={index}
                      className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700"
                    >

                      {file.name}

                    </div>
                  )
                )
              }

            </div>

          </div>
        )
      }

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-zinc-400 text-lg">
            Total Resumes
          </h2>

          <p className="text-6xl mt-5 text-cyan-400 font-bold">

            {candidates.length}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-zinc-400 text-lg">
            Shortlisted
          </h2>

          <p className="text-6xl mt-5 text-green-400 font-bold">

            {shortlistedCount}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-zinc-400 text-lg">
            Not Shortlisted
          </h2>

          <p className="text-6xl mt-5 text-red-400 font-bold">

            {notShortlistedCount}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-zinc-400 text-lg">
            Rejected
          </h2>

          <p className="text-6xl mt-5 text-red-400 font-bold">

            {rejectedCount}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

          <h2 className="text-zinc-400 text-lg">
            Top Score
          </h2>

          <p className="text-6xl mt-5 text-yellow-400 font-bold">

            {topScore}%

          </p>

        </div>

      </div>

      {/* Full Page Loading */}

      {
        loading && (

          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center">

            <div className="w-24 h-24 border-[10px] border-cyan-400 border-t-transparent rounded-full animate-spin mb-8"></div>

            <h1 className="text-5xl font-bold text-cyan-400 animate-pulse">
              Analyzing Resumes...
            </h1>

            <p className="text-zinc-400 mt-5 text-xl">
              AI ATS Engine Processing Candidates
            </p>

          </div>
        )
      }

      {/* Loading */}
      {
        loading && (

          <div className="bg-zinc-900 p-10 rounded-3xl text-center mb-10 border border-zinc-800">

            <h2 className="text-4xl font-bold text-cyan-400">

              Analyzing Resumes...

            </h2>

            <p className="text-zinc-400 mt-4">

              AI is extracting skills and ranking candidates

            </p>

          </div>
        )
      }

      {/* Insights */}
      <div className="
bg-zinc-900
p-6
rounded-3xl
border
border-zinc-800
">

        <h2 className="
  text-2xl
  font-bold
  text-cyan-400
  mb-6
  ">

          AI Hiring Insights

        </h2>

        {

          candidates.length > 0 && (

            <div className="space-y-5">

              <div>

                <p className="text-zinc-400">
                  Best Candidate
                </p>

                <h1 className="
          text-3xl
          font-bold
          text-white
          mt-1
          ">

                  {candidates[0]?.name}

                </h1>

              </div>

              <div>

                <p className="text-zinc-400">
                  ATS Score
                </p>

                <h1 className="
          text-5xl
          font-bold
          text-green-400
          mt-2
          ">

                  {candidates[0]?.score}%

                </h1>

              </div>

              <div>

                <p className="text-zinc-400 mb-3">
                  Top Skills
                </p>

                <div className="
          flex
          flex-wrap
          gap-2
          ">

                  {

                    candidates[0]?.skills
                      ?.slice(0, 6)
                      .map((skill, i) => (

                        <span
                          key={i}
                          className="
                    bg-cyan-500/20
                    text-cyan-300
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                    "
                        >

                          {skill}

                        </span>
                      ))
                  }

                </div>

              </div>

              <div className="
        bg-green-500/10
        border
        border-green-500/20
        rounded-2xl
        p-4
        ">

                <p className="
          text-green-400
          font-semibold
          ">

                  AI Recommendation

                </p>

                <p className="
          text-zinc-300
          mt-2
          leading-7
          ">

                  Strong candidate with high
                  ATS compatibility and
                  relevant technical skills.

                </p>

              </div>

            </div>
          )
        }

      </div>

      {/* Pie Chart */}
      <div className="
w-full
flex
justify-center
mb-16
mt-10
">

        <div className="
  bg-zinc-900
  p-8
  rounded-3xl
  border
  border-zinc-800
  w-full
  max-w-4xl
  flex
  flex-col
  items-center
  ">

          <h2 className="
    text-4xl
    font-bold
    mb-8
    text-cyan-400
    text-center
    ">

            Resume Status Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={500}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={160}
                label
              >

                <Cell fill="#06b6d4" />
                <Cell fill="#eab308" />
                <Cell fill="#ef4444" />

              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                align="center"
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bar Chart */}
      <div className="
bg-zinc-900
p-6
rounded-3xl
border
border-zinc-800
mb-16
overflow-hidden
">

        <h2 className="
  text-2xl
  font-bold
  mb-8
  text-cyan-400
  ">

          Candidate ATS Scores

        </h2>

        <div className="w-full h-[450px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={barData}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 40,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{
                  fontSize: 12,
                  fill: "#a1a1aa"
                }}
                tickFormatter={(value) =>
                  value.length > 10
                    ? value.substring(0, 10) + "..."
                    : value
                }
              />

              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  color: "#fff"
                }}
                formatter={(value) => [`${value}%`, "ATS Score"]}
                labelFormatter={(label) => `Candidate: ${label}`}
              />

              <Bar
                dataKey="score"
                fill="#06b6d4"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Filter Buttons */}
      {/* Results Table */}
      {
        candidates.length > 0 && (

          <div className="
    bg-zinc-900
    rounded-3xl
    overflow-hidden
    border
    border-zinc-800
    ">

            {/* Header + Filters */}
            <div className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-6
      p-8
      border-b
      border-zinc-800
      ">

              <h2 className="
        text-4xl
        font-bold
        text-white
        ">

                Resume Analysis Results

              </h2>

              {/* Filter Buttons */}
              <div className="relative">

                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value)
                  }
                  className="
    bg-zinc-800
    text-white
    px-5
    py-3
    rounded-2xl
    outline-none
    border
    border-zinc-700
    font-semibold
    cursor-pointer
    min-w-[180px]
    "
                >

                  <option value="ALL">
                    All
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Review">
                    Review
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-zinc-800">

                  <tr>

                    <th className="p-5 text-left">
                      Candidate
                    </th>

                    <th className="p-5 text-left">
                      Role
                    </th>

                    <th className="p-5 text-left">
                      Experience
                    </th>

                    <th className="p-5 text-left">
                      AI Score
                    </th>

                    <th className="p-5 text-left">
                      Skills
                    </th>

                    <th className="p-5 text-left">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredCandidates.map(
                      (candidate, index) => (

                        <tr
                          key={index}
                          className="
                    border-b
                    border-zinc-800
                    hover:bg-zinc-800/50
                    transition-all
                    "
                        >

                          <td className="p-5 font-semibold">

                            {candidate.name}

                          </td>

                          <td className="p-5 text-zinc-300">

                            {candidate.role}

                          </td>

                          <td className="p-5 text-zinc-300">

                            {candidate.experience}

                          </td>

                          <td className="p-5">

                            <div className="
                      flex
                      items-center
                      gap-3
                      ">

                              <div className="
                        w-[140px]
                        bg-zinc-700
                        rounded-full
                        h-3
                        overflow-hidden
                        ">

                                <div
                                  className="
                            bg-cyan-400
                            h-3
                            rounded-full
                            "
                                  style={{
                                    width: `${candidate.score}%`,
                                  }}
                                ></div>

                              </div>

                              <span className="
                        font-bold
                        text-cyan-400
                        ">

                                {candidate.score}%

                              </span>

                            </div>

                          </td>

                          <td className="p-5">

                            <div className="
                      flex
                      flex-wrap
                      gap-2
                      max-w-[300px]
                      ">

                              {

                                candidate.skills.map(
                                  (skill, i) => (

                                    <span
                                      key={i}
                                      className="
                                bg-cyan-500/20
                                text-cyan-300
                                border
                                border-cyan-500/30
                                px-3
                                py-1
                                rounded-lg
                                text-sm
                                whitespace-nowrap
                                "
                                    >

                                      {skill}

                                    </span>
                                  )
                                )
                              }

                            </div>

                          </td>

                          <td className="p-5">

                            <span
                              className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${candidate.status ===
                                  "Shortlisted"

                                  ? "bg-green-500/20 text-green-400"

                                  : candidate.status ===
                                    "Review"

                                    ? "bg-yellow-500/20 text-yellow-400"

                                    : "bg-red-500/20 text-red-400"
                                }
                        `}
                            >

                              {candidate.status}

                            </span>

                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>
        )
      }

    </div >
  );
};

export default Dashboard;