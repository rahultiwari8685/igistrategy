import React, { useEffect, useState } from 'react'
import { CRow, CCol, CFormSelect } from '@coreui/react'
import { useReportStore } from './reportStore'
import politicalRegions from "../../../data/politicalRegions.json"

const ReportFilters = () => {
    const setFilters = useReportStore((s) => s.setFilters)

    const [reportType, setReportType] = useState('')
    const [state, setState] = useState('')
    const [states, setStates] = useState([])
    const [constituencies, setConstituencies] = useState([])


    useEffect(() => {
        if (reportType === 'political') {
            const stateList = Object.keys(politicalRegions)
            setStates(stateList)
        } else {
            setStates([])
            setConstituencies([])
            setState('')
            setFilters({ state: '', constituency: '' })
        }
    }, [reportType])


    useEffect(() => {
        if (state) {
            setConstituencies(politicalRegions[state] || [])
        } else {
            setConstituencies([])
        }
    }, [state])

    return (
        <CRow className="mb-3">


            <CCol md={3}>
                <CFormSelect
                    label="Report Type"
                    value={reportType}
                    onChange={(e) => {
                        const value = e.target.value
                        setReportType(value)
                        setFilters({ report_type: value })
                    }}
                >
                    <option value="">All</option>
                    <option value="political">Political</option>
                    <option value="corporate">Corporate</option>
                </CFormSelect>
            </CCol>


            <CCol md={3}>
                <CFormSelect
                    label="State"
                    value={state}
                    disabled={reportType !== 'political'}
                    onChange={(e) => {
                        const value = e.target.value
                        setState(value)
                        setFilters({ state: value, constituency: '' })
                    }}
                >
                    <option value="">All States</option>
                    {states.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </CFormSelect>
            </CCol>


            <CCol md={3}>
                <CFormSelect
                    label="Constituency"
                    disabled={!state}
                    onChange={(e) =>
                        setFilters({ constituency: e.target.value })
                    }
                >
                    <option value="">All Constituencies</option>
                    {constituencies.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </CFormSelect>
            </CCol>

        </CRow>
    )
}

export default ReportFilters
