import React, { useEffect } from 'react';
import {
    CTable, CTableBody, CTableHead, CTableHeaderCell,
    CTableRow, CTableDataCell
} from '@coreui/react';
import axios from 'axios';
import { useReportStore } from './reportStore';
import ReportFilters from './ReportFilters';

const ReportList = () => {
    const { filters, list, setList } = useReportStore();

    const loadData = async () => {
        const res = await axios.get(
            process.env.REACT_APP_API_URL + '/reports',
            { params: filters }
        );
        setList(res.data);
    };

    useEffect(() => {
        loadData();
    }, [filters]);

    return (
        <>
            <ReportFilters />

            <CTable bordered hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Type</CTableHeaderCell>
                        <CTableHeaderCell>Sub Type</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>State</CTableHeaderCell>
                        <CTableHeaderCell>Constituency</CTableHeaderCell>
                        <CTableHeaderCell>Created</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    {list.map((item) => (
                        <CTableRow key={item._id}>
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
