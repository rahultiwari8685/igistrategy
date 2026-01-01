import React, { useEffect } from 'react';
import {
    CTable, CTableBody, CTableHead, CTableHeaderCell,
    CTableRow, CTableDataCell
} from '@coreui/react';
import axios from 'axios';
import { useReportStore } from './reportStore';
import ReportFilters from './ReportFilters';
import setting from "../../../setting.json"

const ReportList = () => {
    const { filters, list, setList } = useReportStore();

    const getAllReport = async () => {

        await fetch(setting.api + "/api/reports/getAllReport", {
            method: "GET",
            mode: "cors",
            headers: {
                // "Content-Type": "application/json",
                // "Authorization": 'Bearer ' + JSON.parse(secureLocalStorage.getItem("logininfo")).token,
            },

        })
            .then(response => response.json())
            .then(u => {

                if (u.status == false) {
                    // secureLocalStorage.clear();
                    navigate('/login');
                } else {
                    setList(u.data);
                    console.log(u.data);
                }
            }
            );

    }


    useEffect(() => {
        getAllReport();
    }, []);

    return (
        <>
            <ReportFilters />

            <CTable bordered hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>SR.No</CTableHeaderCell>
                        <CTableHeaderCell>Type</CTableHeaderCell>
                        <CTableHeaderCell>Sub Type</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>State</CTableHeaderCell>
                        <CTableHeaderCell>Constituency</CTableHeaderCell>
                        <CTableHeaderCell>Created</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    {list.map((item, index) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>{index + 1}</CTableDataCell>
                            <CTableDataCell>{item.report_type}</CTableDataCell>
                            <CTableDataCell>{item.sub_type}</CTableDataCell>
                            <CTableDataCell>{item.title}</CTableDataCell>
                            <CTableDataCell>{item.state}</CTableDataCell>
                            <CTableDataCell>{item.constituency || "-"}</CTableDataCell>
                            <CTableDataCell>
                                {new Date(item.createdAt).toLocaleString()}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    );
};

export default ReportList;
