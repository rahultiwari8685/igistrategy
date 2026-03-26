import React from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import setting from '../../../setting.json'
import secureLocalStorage from 'react-secure-storage'

const schema = yup.object().shape({
  email: yup.string().email().required('Enter your valid email'),
  password: yup.string().required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const login = (data) => {
    let lg = {
      email: data.email,
      password: data.password,
    }

    fetch(setting.api + '/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lg),
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((dd) => {
        if (dd.result === 'success') {
          secureLocalStorage.setItem('logininfo', JSON.stringify({ ...dd.user, token: dd.token }))
          navigate('/dashboard')
        } else {
          alert(dd.message || 'Login failed')
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <div style={styles.wrapper}>
      {/* Background Abstract Illustration */}
      <div style={styles.leftPane}>
        <div style={styles.leftContent}>
          <h1 style={styles.title}>Know Your Reality</h1>
          <p style={styles.subtitle}>
            Data-driven political insights, leader performance analysis, sentiment tracking, and
            detailed survey intelligence — all on one platform.
          </p>

          <div style={styles.highlights}>
            <p>✓ AI-powered Survey Reports</p>
            <p>✓ Leader Rating & Popularity Graphs</p>
            <p>✓ Real-time Public Sentiment</p>
            <p>✓ Political Data Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* Right Login Card */}
      <div style={styles.rightPane}>
        <CCard style={styles.card}>
          <CCardBody>
            <h2 className="text-center mb-4" style={styles.loginTitle}>
              Login to Your Dashboard
            </h2>

            <CForm onSubmit={handleSubmit(login)}>
              {/* Email */}
              <CInputGroup className="mb-3">
                <CInputGroupText style={styles.iconBox}>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  type="email"
                  placeholder="Email Address"
                  style={styles.input}
                  {...register('email')}
                />
              </CInputGroup>
              {errors.email && <p style={styles.error}>{errors.email.message}</p>}

              {/* Password */}
              <CInputGroup className="mb-3">
                <CInputGroupText style={styles.iconBox}>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  style={styles.input}
                  {...register('password')}
                />
              </CInputGroup>
              {errors.password && <p style={styles.error}>{errors.password.message}</p>}

              <CButton type="submit" className="w-100 py-2 mt-2" style={styles.button}>
                Sign In
              </CButton>
            </CForm>

            <p className="text-center mt-3" style={styles.signupText}>
              Don't have an account? <span style={styles.signupLink}>Contact Admin</span>
            </p>
          </CCardBody>
        </CCard>
      </div>
    </div>
  )
}

/* ---------------- STYLES ---------------- */
const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    background: 'linear-gradient(135deg, #0a0f24 0%, #101426 100%)',
    color: '#fff',
  },

  leftPane: {
    width: '53%',
    background:
      "url('https://cdn.dribbble.com/users/1355613/screenshots/15657654/media/2da52d3a3d55c97c2abb83378574b88e.png') center/cover no-repeat",
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '60px',
  },

  leftContent: {
    maxWidth: '500px',
    backdropFilter: 'blur(4px)',
    padding: '20px',
  },

  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#21d4fd',
  },

  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '25px',
    color: '#c7d3ff',
    lineHeight: '1.5',
  },

  highlights: {
    fontSize: '1rem',
    color: '#fff',
    lineHeight: '1.8',
  },

  rightPane: {
    width: '47%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  },

  loginTitle: {
    color: '#21d4fd',
    fontWeight: '700',
  },

  input: {
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#fff',
  },

  iconBox: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    border: 'none',
    color: '#fff',
  },

  button: {
    background: 'linear-gradient(45deg, #21d4fd, #b721ff)',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '8px',
  },

  signupText: {
    color: '#ccc',
    marginTop: '10px',
  },

  signupLink: {
    color: '#21d4fd',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  error: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
    marginTop: '-5px',
  },
}

export default Login
