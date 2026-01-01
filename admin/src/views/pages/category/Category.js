import React, { useEffect, useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CButton,
    CRow,
    CCol,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    COffcanvas,
    COffcanvasHeader,
    COffcanvasBody,
    CFormSelect,
    CPagination,
    CPaginationItem,
} from "@coreui/react";
import { useForm } from "react-hook-form";


import setting from '../../../setting.json'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import secureLocalStorage from "react-secure-storage";
import { cilPen, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    parentCategory: yup.string().required("Phone is required"),
    slug: yup.string(),
    metaTitle: yup.string().required("Meta Title is required"),
    metaDescription: yup.string().required("Meta Description is required"),
    showInMenu: yup.string().required("Meta Description is required"),

});

const Category = () => {

    const [category, setCategoryList] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [visible, setVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const getAllCategory = async () => {

        await fetch(setting.api + "/api/categories/getAllCategory", {
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
                    setCategoryList(u.data);
                    console.log(u.data);
                }
            }
            );

    }


    useEffect(() => {
        getAllCategory();
    }, []);


    const saveCategory = async (data) => {
        const db = {
            name: data.name,
            slug: data.slug,
            parentCategory: data.parentCategory,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            showInMenu: data.showInMenu,
        };

        let endpoint = "/api/categories/saveCategory";

        if (editingCategory) {
            endpoint = "/api/categories/updateCategory";
            db.id = editingCategory.id;
        }

        try {
            const res = await fetch(setting.api + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization:
                    //     "Bearer " +
                    //     JSON.parse(secureLocalStorage.getItem("logininfo")).token,
                },
                body: JSON.stringify(db),
            });

            const result = await res.json();

            if (result.success === true) {
                reset(

                );
                getAllCategory();
                setEditingCategory(null);
                setVisible(false);
            } else {
                alert(result.message || "Failed to save category");
            }
        } catch (err) {
            console.error("Error saving category:", err);
        }
    };


    const handleEdit = (cat) => {
        setEditingCategory(cat);
        setVisible(true);


        setValue("name", cat.name);
        setValue("parent", cat.parent);
        setValue("slug", cat.slug);
        setValue("meta_title", cat.meta_title);
        setValue("meta_desc", cat.meta_desc);
    };

    function handleDelete(id) {
        var ans = confirm("Are you sure For Delete?");
        console.log(ans);

        if (ans == true) {
            deleteUser(id);
        }

    }

    const deleteUser = async (id) => {
        try {
            const token = JSON.parse(secureLocalStorage.getItem("logininfo"))?.token;

            const response = await fetch(`${setting.api}/api/categories/delete/${id}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error("Delete failed:", response.status);
            } else {
                console.log("User deleted:", await response.json());
                getAllCategory();
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const totalPages = Math.ceil(category.length / itemsPerPage);
    const paginatedItems = category.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <CCard className="shadow border-0 rounded-4">
                <CCardHeader className="bg-dark text-white fw-bold px-4 py-3 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <i className="bi bi-tags-fill me-2 text-info"></i> Categories
                        </h5>
                        <CButton
                            color="light"
                            variant="outline"
                            className="fw-semibold px-3 shadow-sm rounded-pill"
                            onClick={() => {
                                setVisible(true);
                                setEditingCategory(null);
                            }}
                        >
                            <i className="bi bi-plus-circle me-2"></i> Add Category
                        </CButton>
                    </div>
                </CCardHeader>

                <CCardBody>
                    <CTable striped responsive bordered hover>
                        <CTableHead color="dark">
                            <CTableRow>
                                <CTableHeaderCell>#</CTableHeaderCell>
                                <CTableHeaderCell>Name</CTableHeaderCell>
                                <CTableHeaderCell>Parent</CTableHeaderCell>
                                <CTableHeaderCell>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {
                                paginatedItems.map((cat, index) => {
                                    const actualIndex = (currentPage - 1) * itemsPerPage + index;
                                    return (
                                        <CTableRow key={cat.id}>
                                            <CTableDataCell>{actualIndex + 1}</CTableDataCell>
                                            <CTableDataCell>{cat.name}</CTableDataCell>
                                            <CTableDataCell>
                                                {cat?.parentCategory?.name || "—"}
                                            </CTableDataCell>

                                            <CTableDataCell>
                                                <CButton
                                                    size="sm"
                                                    color="warning"
                                                    className="rounded-pill px-3 shadow-sm fw-semibold"
                                                    onClick={() => handleEdit(cat)}
                                                >
                                                    <CIcon icon={cilPencil} style={{ marginRight: '5px' }} /> Edit
                                                </CButton>{" "}
                                                <CButton
                                                    size="sm"
                                                    color="danger"
                                                    className="rounded-pill px-3 shadow-sm fw-semibold"
                                                    onClick={() => handleDelete(cat.id)}
                                                >
                                                    <CIcon icon={cilTrash} style={{ marginRight: '5px' }} /> Delete
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                })
                            }

                        </CTableBody>
                    </CTable>

                    <div className="d-flex justify-content-end mt-3">
                        <CPagination align="end">
                            {[...Array(totalPages)].map((_, idx) => (
                                <CPaginationItem
                                    key={idx + 1}
                                    active={currentPage === idx + 1}
                                    onClick={() => setCurrentPage(idx + 1)}
                                >
                                    {idx + 1}
                                </CPaginationItem>
                            ))}
                        </CPagination>
                    </div>

                </CCardBody>
            </CCard>


            <COffcanvas
                placement="end"
                visible={visible}
                onHide={() => setVisible(false)}
                backdrop={true}
            >
                <COffcanvasHeader className="bg-dark text-white fw-bold" closeButton>
                    {editingCategory ? "Update Category" : "Add Category"}
                </COffcanvasHeader>
                <COffcanvasBody>
                    <CForm onSubmit={handleSubmit(saveCategory)}>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Category Name"
                                    label="Category Name"
                                    name="name"
                                    {...register("name", { required: "Name is required" })}
                                    required
                                />
                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Slug"
                                    placeholder="Enter Slug"
                                    name="slug"
                                    {...register("slug")}
                                    required
                                />
                                {errors.slug && (
                                    <small className="text-danger">{errors.slug.message}</small>
                                )}
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormSelect
                                    label="Parent Category"
                                    {...register("parentCategory", { required: "Parent Category is required" })}
                                >
                                    <option value="0">As Parent</option>
                                    {category && category.map((a, i) => (

                                        <option value={a._id}>{a.name}</option>


                                    ))}


                                </CFormSelect>
                                {errors.parentCategory && (
                                    <small className="text-danger">{errors.parentCategory.message}</small>
                                )}
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Meta Title"
                                    label="Meta Title"
                                    name="name"
                                    {...register("metaTitle", { required: "Meta Title is required" })}
                                    required
                                />
                                {errors.metaTitle && (
                                    <small className="text-danger">{errors.metaTitle.message}</small>
                                )}
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Meta Description"
                                    label="Meta Description"
                                    name="name"
                                    {...register("metaDescription", { required: "Meta Description is required" })}
                                    required
                                />
                                {errors.metaDescription && (
                                    <small className="text-danger">{errors.metaDescription.message}</small>
                                )}
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md={12}>
                                <CFormSelect
                                    label="Show in Menu"
                                    {...register("showInMenu", { required: "Menu is required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>

                                </CFormSelect>
                                {errors.showInMenu && (
                                    <small className="text-danger">{errors.showInMenu.message}</small>
                                )}
                            </CCol>
                        </CRow>



                        <div className="d-flex justify-content-end">
                            <CButton
                                type="submit"
                                color={editingCategory ? "warning" : "success"}
                                className="rounded-pill px-4 shadow-sm fw-semibold"
                            >
                                <i
                                    className={`bi ${editingCategory ? "bi-arrow-repeat" : "bi-check-circle"
                                        } me-2`}
                                ></i>
                                {editingCategory ? "Update Category" : "Save Category"}
                            </CButton>
                        </div>
                    </CForm>
                </COffcanvasBody>
            </COffcanvas>
        </div>
    );
};

export default Category;
