import React, { useEffect, useState } from 'react'
import {
    CForm, CFormInput, CFormSelect, CFormTextarea,
    CButton, CRow, CCol
} from '@coreui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import constituenciesData from "../../../data/constituencies.json"
import setting from "../../../setting.json"
const ReportForm = () => {

    const { register, handleSubmit, watch, reset, setValue } = useForm()

    const reportType = watch("report_type")
    const selectedState = watch("state")

    const [states, setStates] = useState([])
    const [constituencies, setConstituencies] = useState([])


    useEffect(() => {
        if (reportType === "political") {
            setStates(Object.keys(constituenciesData))
        } else {

            setStates([])
            setConstituencies([])
            setValue("state", "")
            setValue("constituency", "")
        }
    }, [reportType, setValue])


    useEffect(() => {
        if (selectedState) {
            setConstituencies(constituenciesData[selectedState] || [])
        } else {
            setConstituencies([])
            setValue("constituency", "")
        }
    }, [selectedState, setValue])

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()

            formData.append("report_type", data.report_type)
            formData.append("title", data.title)
            formData.append("overview", data.overview)
            formData.append("description", data.description)
            formData.append("state", data.state || "")
            formData.append("constituency", data.constituency || "")
            // formData.append("data", JSON.stringify({}))

            if (data.preview_pdf?.[0]) {
                formData.append("preview_pdf", data.preview_pdf[0])
            }

            if (data.report_pdf?.[0]) {
                formData.append("report_pdf", data.report_pdf[0])
            }

            await axios.post(
                setting.api + "/api/reports/saveReport",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )

            reset()
            alert("Report Created Successfully")

        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        }
    }

    return (
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <CRow>

                <CCol md={6} className="mt-2">
                    <CFormSelect
                        label="Report Type"
                        {...register("report_type", { required: true })}
                    >
                        <option value="">Select</option>
                        <option value="political">Political</option>
                        <option value="corporate">Corporate</option>
                    </CFormSelect>
                </CCol>

                <CCol md={6} className="mt-2">
                    <CFormInput
                        label="Report Title"
                        placeholder="Enter Report Title"
                        {...register("title", { required: true })}
                    />
                </CCol>

                <CCol md={12} className="mt-2">
                    <CFormTextarea
                        label="Report Overview"
                        placeholder='Enter Overview'
                        rows={3}
                        {...register("overview")}
                    />
                </CCol>

                <CCol md={12} className="mt-2">
                    <CFormTextarea
                        label="Description / Key Points"
                        rows={5}
                        placeholder='Enter Description'
                        {...register("description")}
                    />
                </CCol>


                {reportType === "political" && (
                    <CCol md={6} className="mt-2">
                        <CFormSelect label="State" {...register("state")}>
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </CFormSelect>
                    </CCol>
                )}


                {reportType === "political" && selectedState && (
                    <CCol md={6} className="mt-2">
                        <CFormSelect label="Constituency" {...register("constituency")}>
                            <option value="">Select Constituency</option>
                            {constituencies.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </CFormSelect>
                    </CCol>
                )}

                <CCol md={12} className="mt-3">
                    <CFormInput
                        type="file"
                        accept="application/pdf"
                        label="Preview Report (PDF)"
                        {...register("preview_pdf")}
                    />
                </CCol>

                <CCol md={12} className="mt-3">
                    <CFormInput
                        type="file"
                        accept="application/pdf"
                        label="Full Report (PDF)"
                        {...register("report_pdf")}
                    />
                </CCol>

                <CCol md={12} className="d-flex justify-content-end mt-4">
                    <CButton color="success" type="submit">
                        Submit
                    </CButton>
                </CCol>


            </CRow>
        </CForm>
    )
}

export default ReportForm
