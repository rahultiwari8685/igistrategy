import React from "react";
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
} from "@coreui/react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const COLORS = ["#0d6efd", "#6610f2", "#198754", "#fd7e14"];

const DemographicsPanel = ({ ageData = [], genderData = [] }) => {
    // sample fallback
    const ages = ageData.length
        ? ageData
        : [
            { ageGroup: "18-24", value: 3200 },
            { ageGroup: "25-34", value: 5400 },
            { ageGroup: "35-44", value: 3600 },
            { ageGroup: "45-60", value: 1800 },
            { ageGroup: "60+", value: 800 },
        ];

    const genders = genderData.length
        ? genderData
        : [
            { name: "Male", value: 7800 },
            { name: "Female", value: 6500 },
            { name: "Other", value: 500 },
        ];

    return (
        <div>
            <CRow className="g-4">
                <CCol lg={8} md={12} sm={12}>
                    <CCard className="shadow-sm border-0" style={{ borderRadius: 12 }}>
                        <CCardBody>
                            <h5 className="fw-bold mb-3">Respondent Age Groups</h5>
                            <div style={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ages}>
                                        <XAxis dataKey="ageGroup" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#0d6efd" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={4} md={12} sm={12}>
                    <CCard className="shadow-sm border-0" style={{ borderRadius: 12 }}>
                        <CCardBody>
                            <h5 className="fw-bold mb-3">Respondent Gender Split</h5>
                            <div style={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={genders}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            label
                                        >
                                            {genders.map((entry, idx) => (
                                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default DemographicsPanel;
