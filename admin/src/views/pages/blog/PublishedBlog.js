import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CForm,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton
} from '@coreui/react'
import { cilTrash, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import setting from '../../../setting.json'
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const PublishedNews = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [blogList, setBlogList] = useState([]);


  // const fetchNews = async () => {
  //   try {
  //     const token = JSON.parse(secureLocalStorage.getItem("logininfo")).token;

  //     const res = await fetch(setting.api + "/api/news/publishedNews", {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });

  //     const data = await res.json();
  //     setNewsList(data.news || []);
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNews();
  // }, []);




  const getAllBlog = async () => {
    await fetch(setting.api + "/api/blogs/getAllBlog", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + JSON.parse(secureLocalStorage.getItem("logininfo")).token,
      },

    })
      .then(response => response.json())
      .then(u => {

        if (u.status == false) {
          // secureLocalStorage.clear();
          navigate('/login');
        } else {
          setBlogList(u.data);


        }
      }
      );

  }

  useEffect(() => {
    getAllBlog();
  }, [])

  // const getUserName = (id) => {
  //   console.log(id);
  //   const user = userList.find(c => String(c.id) === String(id));
  //   return user ? user.name : 'N/A';
  // };


  const handleEdit = (news) => {
    navigate(`/UpdateNews/${news.id}`);
  };

  function handleDelete(id) {
    var ans = confirm("Are you sure For Delete?");
    console.log(ans);

    if (ans == true) {
      deleteNews(id);
    }

  }




  const deleteNews = async (id) => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem("logininfo"))?.token;

      const response = await fetch(`${setting.api}/api/news/delete/${id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send token
        },
      });

      if (!response.ok) {
        console.error("Delete failed:", response.status);
      } else {
        console.log("User deleted:", await response.json());
        fetchNews(); // ✅ refresh after delete
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const filteredNews = blogList.filter((news) =>
    news.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <CCard className="shadow-sm border-0 rounded-4">
      <CCardHeader className="bg-dark text-white fw-bold px-4 py-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-play-circle-fill me-2 text-danger"></i> Published Video
          </h5>
        </div>
      </CCardHeader>

      <CCardBody>
        {/* 🔍 Filters (optional) */}
        <CForm className="mb-4">
          <CRow className="g-3">
            {/* <CCol md={3}>
              <CFormLabel htmlFor="fromDate">From Date</CFormLabel>
              <CFormInput type="date" id="fromDate" />
            </CCol>
            <CCol md={3}>
              <CFormLabel htmlFor="toDate">To Date</CFormLabel>
              <CFormInput type="date" id="toDate" />
            </CCol> */}
            <CCol md={12}>
              <CFormInput
                type="text"
                id="searchText"
                placeholder="Search by Title"
                value={searchText} // bind state
                onChange={(e) => setSearchText(e.target.value)} // update state
              />
            </CCol>
          </CRow>
        </CForm>

        {/* 📋 Table */}
        <CTable align="middle" hover responsive bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Category</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Author</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredNews.map((news, index) => (
              <CTableRow key={news.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{news.title}</CTableDataCell>

                {/* ✅ Show all category names */}
                <CTableDataCell>
                  {news.categories && news.categories.length > 0
                    ? news.categories.map(cat => cat.name).join(", ")
                    : "-"}
                </CTableDataCell>

                {/* <CTableDataCell>{news.user_id}</CTableDataCell> */}
                <CTableDataCell>{new Date(news.createdAt).toLocaleDateString()}</CTableDataCell>

                <CTableDataCell>
                  <CButton size="sm" color="primary" className="rounded-pill px-3 shadow-sm fw-semibold" onClick={() => handleEdit(news)}>
                    <CIcon icon={cilPencil} /> Edit
                  </CButton>{" "}
                  <CButton size="sm" color="danger" className="rounded-pill px-3 shadow-sm fw-semibold" onClick={() => handleDelete(news.id)}>
                    <CIcon icon={cilTrash} /> Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>

        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default PublishedNews
