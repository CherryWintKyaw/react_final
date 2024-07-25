import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow,
  CFormGroup
} from '@coreui/react';
import $ from "jquery";
import SuccessError from '../common/SuccessError';
import './LoginForm.css'; // Ensure to create this file for custom styles

const LoginForm = (props) => {

  useEffect(() => {
    $(window).resize(function() {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);

  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  ); // browser zoom level

  let { loginClick, keyDownHandle, passwordChange, password, userCodeChange, userCode, success, error } = props;

  return (
    <div className="login-bg min-vh-100 d-flex flex-row align-items-center">
      <CRow className="justify-content-center w-100">
        <CCol lg="4" md="6" sm="8" xs="12">
          <CCard className="login-card">
            <CCardBody className="p-4">
              <CRow className="justify-content-center mb-3">
                <CImg src='./image/robot.jpg' width={80} height={90} className="mb-3"/>
              </CRow>
              <CRow className="justify-content-center mb-3">
                <h3 className='login-title'>Registration System</h3>
              </CRow>
              <SuccessError success={success} error={error} />
              <CFormGroup className="mt-3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CImg src='./image/user.png' width={20} height={20} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput 
                    className="login-input" 
                    placeholder='Enter Username' 
                    type='text' 
                    autoFocus 
                    value={userCode} 
                    onChange={userCodeChange} 
                    onKeyDown={keyDownHandle}
                  />
                </CInputGroup>
              </CFormGroup>
              <CFormGroup className="mt-3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CImg src='./image/password.png' width={20} height={20} />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput 
                    className="login-input" 
                    placeholder='Enter Password' 
                    type='password'
                    value={password} 
                    onChange={passwordChange} 
                    onKeyDown={keyDownHandle}
                  />
                </CInputGroup>
              </CFormGroup>
              <CFormGroup className="mt-3 d-flex justify-content-between">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="rememberMe" />
                  <label className="custom-control-label text-white" htmlFor="rememberMe">Remember me</label>
                </div>
                <CButton color="link" className="px-0">Forgot Password?</CButton>
              </CFormGroup>
              <CRow className="justify-content-center mt-4">
                <CButton 
                  id="login" 
                  className='form-btn btn-blue' 
                  onClick={loginClick}
                >
                  Login
                </CButton>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default LoginForm;
