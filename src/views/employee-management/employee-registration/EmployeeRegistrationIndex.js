import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CRow,
  CSelect,
  CFormGroup,
  CLabel
} from '@coreui/react';
import { useHistory } from 'react-router';
import DatePicker from '../../common/datepicker/DatePicker';
import Loading from "../../common/Loading";
import { emailChk, nullChk, validateName } from "../../common/CommonValidation";
import SuccessError from "../../common/SuccessError"; 
import Confirmation from "../../common/Confirmation";
import { ApiRequest } from "../../common/ApiRequest";
import moment from "moment";

const EmployeeRegistrationIndex = () => {
  const history = useHistory();
  const [genderData] = useState([
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ]);
  const [englishSkillData] = useState([
    { id: "1", name: "Elementary" },
    { id: "2", name: "Intermediate" },
    { id: "3", name: "Advanced" },
    { id: "4", name: "Proficient" },
  ]);
  const [japaneseSkillData] = useState([
    { id: "1", name: "N1" },
    { id: "2", name: "N2" },
    { id: "3", name: "N3" },
    { id: "4", name: "N4" },
    { id: "5", name: "N5" },
  ]);

  const [fromDate, setFromDate] = useState(null); // for from date
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [selectJapan, setSelectJapan] = useState("");
  const [selectEng, setSelectEng] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [confirmType, setConfirmType] = useState("");
  const [content, setContent] = useState("");
  const [confirmationModel, setConfirmationModel] = useState(false);
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message

  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);
    let updateFrom = localStorage.getItem(`Update`);
    localStorage.removeItem('Update');
    setUpdateID(updateFrom);
    if (flag === "true") {
      if (updateFrom != null) {
        formLoad();
        setUpdateStatus(true);
      }
    } else {
      history.push(`/Login`);
    }
  }, []);

  const formLoad = async () => {
    setLoading(true);
    setUpdateStatus(false);
    let saveData = {
      method: "get",
      url: `employee/edit/${updateID}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setEmail(response.data.data.email);
        setSelectJapan(response.data.data.japanese_skill);
        setSelectEng(response.data.data.english_skill);
        setFromDate(response.data.data.date_of_birth);
        setSelectGender(response.data.data.gender);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  }

  const reset = () => {
    setUserName("");
    setEmail("");
    setSelectJapan("");
    setSelectEng("");
    setFromDate(null);
    setSelectGender("");
  }

  const updateClick = async () => {
    setLoading(true);
    setUpdateStatus(false);
    let saveData = {
      method: "post",
      url: `employee/update/${updateID}`,
      params: {
        name: userName,
        email: email,
        japanese_skill: selectJapan,
        english_skill: selectEng,
        gender: selectGender,
        date_of_birth: fromDate,
      },
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        setSuccess([response.data.message]);
        setError([]);
        reset();
        history.push('/employee-management/employee-list');
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  }

  const saveClick = () => {
    setConfirmationModel(true);
    setContent("Are you sure you want to save?");
    setConfirmType("save");
  }

  const saveOK = async () => {
    let errMsg = [];
    setConfirmationModel(false);

    if (!nullChk(userName)) {
      errMsg.push("Please fill in Username");
    } else if (!validateName(userName)) {
      errMsg.push("Please enter a valid Username (only characters)!");
    }

    if (!nullChk(fromDate)) {
      errMsg.push("Please select your birthday");
    }

    if (!nullChk(selectEng)) {
      errMsg.push("Please select English Skill");
    }

    if (!nullChk(selectJapan)) {
      errMsg.push("Please select Japanese Skill");
    }

    if (!nullChk(email)) {
      errMsg.push("Please fill in Email");
    } else if (!emailChk(email)) {
      errMsg.push("Please enter a valid Email format");
    }

    if (!nullChk(selectGender)) {
      errMsg.push("Please select your gender");
    }

    setUpdateStatus(false);
    if (errMsg.length > 0) {
      setSuccess([]);
      setError(errMsg);
    } else {
      setLoading(true);
      let saveData = {
        method: "post",
        url: `employee/save`,
        params: {
          name: userName,
          email: email,
          japanese_skill: selectJapan,
          english_skill: selectEng,
          gender: selectGender,
          date_of_birth: fromDate,
        },
      };
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess([response.data.message]);
          reset();
          setError([]);
          history.push('/employee-management/employee-list');
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
      setLoading(false);
      setError(errMsg);
    }
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>Employee Registration</h4>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CRow>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="username">Username</CLabel>
                      <CInput type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="gender">Gender</CLabel>
                      <CSelect id="gender" value={selectGender} onChange={(e) => setSelectGender(e.target.value)}>
                        <option value="">-- Select --</option>
                        {genderData.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="dob">Date of Birth</CLabel>
                      <DatePicker value={fromDate} change={setFromDate} />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="englishSkill">English Skill</CLabel>
                      <CSelect id="englishSkill" value={selectEng} onChange={(e) => setSelectEng(e.target.value)}>
                        <option value="">-- Select --</option>
                        {englishSkillData.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol md="6">
                    <CFormGroup>
                      <CLabel htmlFor="japaneseSkill">Japanese Skill</CLabel>
                      <CSelect id="japaneseSkill" value={selectJapan} onChange={(e) => setSelectJapan(e.target.value)}>
                        <option value="">-- Select --</option>
                        {japaneseSkillData.map((data, index) => (
                          <option key={index} value={data.name}>{data.name}</option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CFormGroup>
              <CRow style={{ justifyContent: "center", marginTop: "30px" }}>
                {updateStatus === false ? (
                  <CButton style={{ backgroundColor: 'brown'}} onClick={saveClick}>Save</CButton>
                ) : (
                  <CButton style={{ backgroundColor: 'brown'}} onClick={updateClick}>Update</CButton>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Confirmation
        show={confirmationModel}
        content={content}
        type={confirmType}
        saveOK={saveOK}
        cancel={() => setConfirmationModel(false)}
        cancelButton="No"
        okButton="Yes"
      />
      <Loading start={loading} />
    </>
  );
}

export default EmployeeRegistrationIndex;
