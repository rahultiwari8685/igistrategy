import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CProgress,
  CTable,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilChartLine,
  cilChartPie,
  cilUser,
  cilFlagAlt,
} from "@coreui/icons";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

// -------------------------------------------
// 1. STAT CARDS DATA
// -------------------------------------------
const stats = [
  {
    title: "Total Surveys",
    count: 112,
    goal: 200,
    icon: cilChartLine,
    color: "#0d6efd",
  },
  {
    title: "Active Polls",
    count: 47,
    goal: 100,
    icon: cilChartPie,
    color: "#6610f2",
  },
  {
    title: "Respondents",
    count: 12430,
    goal: 20000,
    icon: cilUser,
    color: "#198754",
  },
  {
    title: "Political Parties",
    count: 8,
    goal: 12,
    icon: cilFlagAlt,
    color: "#dc3545",
  },
];

// -------------------------------------------
// 2. PARTY POPULARITY BAR CHART
// -------------------------------------------
const partyPopularity = [
  { party: "BJP", value: 42 },
  { party: "INC", value: 28 },
  { party: "AAP", value: 12 },
  { party: "JDU", value: 6 },
  { party: "Others", value: 12 },
];

// -------------------------------------------
// 3. VOTER SENTIMENT PIE CHART
// -------------------------------------------
const sentimentData = [
  { name: "Positive", value: 55 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 20 },
];

const COLORS = ["#198754", "#ffc107", "#dc3545"];

// -------------------------------------------
// 4. LIVE TREND LINE CHART
// -------------------------------------------
const pollTrends = [
  { month: "Jan", support: 40 },
  { month: "Feb", support: 44 },
  { month: "Mar", support: 39 },
  { month: "Apr", support: 45 },
  { month: "May", support: 48 },
];

// -------------------------------------------
// 5. RECENT SURVEYS TABLE
// -------------------------------------------
const recentSurveys = [
  { id: 1, title: "2024 PM Approval Rating", responses: 1542 },
  { id: 2, title: "Bihar Caste Sentiment Analysis", responses: 980 },
  { id: 3, title: "Youth Employment Survey", responses: 2021 },
  { id: 4, title: "Women Safety Index", responses: 764 },
];

const Dashboard = () => {
  return (
    <div className="p-4">
      <h3 className="fw-bold mb-4">Political Survey Analytics Dashboard</h3>

      {/* STATISTICS CARDS */}
      <CRow className="g-4">
        {stats.map((item, index) => {
          const progress = Math.min(
            (item.count / item.goal) * 100,
            100
          );
          return (
            <CCol lg={3} md={6} sm={12} key={index}>
              <CCard
                className="border-0 shadow-lg h-100"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                }}
              >
                <CCardBody className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "15px",
                        background: item.color,
                        color: "white",
                      }}
                    >
                      <CIcon icon={item.icon} size="lg" />
                    </div>

                    <div className="ms-3">
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <small className="text-muted">
                        {item.count} / {item.goal}
                      </small>
                    </div>
                  </div>

                  <CProgress
                    value={progress}
                    className="rounded-pill"
                    style={{ height: "10px", background: "#e9ecef" }}
                  />

                  <div className="text-end mt-2">
                    <strong style={{ color: item.color }}>
                      {progress.toFixed(0)}%
                    </strong>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
      </CRow>

      {/* CHARTS SECTION */}
      <CRow className="mt-4">
        {/* Party Popularity */}
        <CCol lg={6}>
          <CCard className="shadow-lg border-0" style={{ borderRadius: "20px" }}>
            <CCardBody>
              <h5 className="fw-bold mb-3">Party Popularity</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={partyPopularity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="party" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0d6efd" />
                </BarChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Voter Sentiment */}
        <CCol lg={6}>
          <CCard className="shadow-lg border-0" style={{ borderRadius: "20px" }}>
            <CCardBody>
              <h5 className="fw-bold mb-3">Voter Sentiment</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* LINE CHART - TRENDS */}
      <CRow className="mt-4">
        <CCol lg={12}>
          <CCard className="shadow-lg border-0" style={{ borderRadius: "20px" }}>
            <CCardBody>
              <h5 className="fw-bold mb-3">Support Trend Over Months</h5>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={pollTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="support"
                    stroke="#6610f2"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* RECENT SURVEYS TABLE */}
      <CRow className="mt-4">
        <CCol lg={12}>
          <CCard className="shadow-lg border-0" style={{ borderRadius: "20px" }}>
            <CCardBody>
              <h5 className="fw-bold mb-3">Recent Surveys</h5>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Responses</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {recentSurveys.map((survey) => (
                    <CTableRow key={survey.id}>
                      <CTableHeaderCell>{survey.id}</CTableHeaderCell>
                      <CTableDataCell>{survey.title}</CTableDataCell>
                      <CTableDataCell>{survey.responses}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;
