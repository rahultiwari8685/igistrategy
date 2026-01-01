import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CBadge
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilBan, cilTrash } from "@coreui/icons";
import axios from "axios";
import setting from "../../../setting.json";

const CustomerList = ({ onEdit }) => {
    const [customers, setCustomers] = useState([]);

    const API_URL = `${setting.api}/api/customers`;

    const loadCustomers = async () => {
        const res = await axios.get(API_URL);
        setCustomers(res.data.data || []);
    };

    const toggleStatus = async (id) => {
        await axios.put(`${API_URL}/${id}`, {
            status: "blocked"
        });
        loadCustomers();
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <CTable responsive hover>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>SR.No</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>

            <CTableBody>
                {customers.map((c, index) => (
                    <CTableRow key={c._id}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{c.name}</CTableDataCell>
                        <CTableDataCell>{c.email}</CTableDataCell>
                        <CTableDataCell>{c.phone}</CTableDataCell>
                        <CTableDataCell>
                            <CBadge color={c.status === "active" ? "success" : "danger"}>
                                {c.status}
                            </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButton
                                size="sm"
                                color="warning"

                                className="rounded-pill px-3 shadow-sm fw-semibold"
                                onClick={() => onEdit(c)}
                            >
                                <CIcon icon={cilPencil} />
                            </CButton>{" "}

                            <CButton
                                size="sm"
                                color="danger"
                                className="rounded-pill px-3 shadow-sm fw-semibold"
                                onClick={() => toggleStatus(c._id)}
                            >
                                <CIcon icon={cilTrash} style={{ marginRight: '5px' }} />Delete
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

export default CustomerList;
