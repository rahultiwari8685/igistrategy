import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import ReportList from './ReportList';
import ReportForm from './ReportForm';

const Reports = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <CCard className="shadow border-0 rounded-4">
            <CCardHeader className="bg-dark text-white fw-bold px-4 py-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">

                    <h5 className='mb-0'>Reports Management</h5>
                    <CButton color="light" variant='outline' className="fw-semibold px-3 shadow-sm rounded-pill" onClick={() => setShowForm(!showForm)}>
                        <i className="bi bi-plus-circle me-2"></i>    {showForm ? 'View Reports' : 'Create Report'}
                    </CButton>
                </div>
            </CCardHeader>

            <CCardBody>
                {!showForm ? <ReportList /> : <ReportForm />}
            </CCardBody>
        </CCard>
    );
};

export default Reports;
