import React, { useState } from "react";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CButton
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilList } from "@coreui/icons";

import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";

const Customers = () => {
    const [showForm, setShowForm] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    return (
        <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">Customer Master</h5>

                <CButton
                    color="primary"
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditCustomer(null);
                    }}
                >
                    <CIcon icon={showForm ? cilList : cilPlus} className="me-2" />
                    {showForm ? "View Customers" : "Add Customer"}
                </CButton>
            </CCardHeader>

            <CCardBody>
                {showForm ? (
                    <CustomerForm
                        editCustomer={editCustomer}
                        onSuccess={() => setShowForm(false)}
                    />
                ) : (
                    <CustomerList
                        onEdit={(customer) => {
                            setEditCustomer(customer);
                            setShowForm(true);
                        }}
                    />
                )}
            </CCardBody>
        </CCard>
    );
};

export default Customers;
