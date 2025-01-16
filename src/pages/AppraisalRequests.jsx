import React, { useState, useEffect } from "react";
import { rawData } from "../Data";
const AppraisalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [managerEmployees, setManagerEmployees] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tabs, setTabs] = useState(false);

  useEffect(() => {
    // Retrieve the logged-in user
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
    setIsAdmin(user?.role === "admin");
    if (user?.role === "manager") {
      // Find the manager's employees from rawData
      const managerData = rawData.organization.managers.find(
        (manager) => manager.email === user.email
      );
      setManagerEmployees(managerData?.employees || []);
    }

    // Retrieve appraisal requests from localStorage
    const storedRequests =
      JSON.parse(localStorage.getItem("appraisalRequests")) || [];
    setRequests(storedRequests);
  }, []);

  // const toggleTabs = () => {
  //   setTabs(true);
  // };
  // Filter appraisals for the manager's employees and the manager's submissions
  const employeeAppraisals = managerEmployees.map((employee) => {
    const selfAppraisals = requests.filter(
      (request) =>
        request.submittedBy === employee.name &&
        request.selectedUsers.some((user) => user.email === employee.email)
    );

    return { ...employee, appraisals: selfAppraisals };
  });

  const managerAppraisals = requests.filter((request) =>
    isAdmin ? request : request.submittedBy === loggedInUser?.name
  );

  return (
    <>
      <h1>Appraisal Systems</h1>

      {loggedInUser?.role === "manager" ? (
        <>
          <div className="tabs">
            <button onClick={() => setTabs(false)}>
              Show Manager Appraisal
            </button>
            <button onClick={() => setTabs(true)}>
              Show Employee Appraisal
            </button>
          </div>

          {!tabs ? (
            <div className="appraisal-requests">
              <div className="container">
                {/* Manager's Submissions */}
                <div className="content">
                  {managerAppraisals.length === 0 ? (
                    <p>No appraisals submitted by you.</p>
                  ) : (
                    managerAppraisals.map((appraisal, index) => (
                      <div key={index} className="card">
                        <p>
                          <strong>Submitted By:</strong> {appraisal.submittedBy}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(appraisal.date).toLocaleString()}
                        </p>
                        <div className="feedback">
                          <h4>Feedback:</h4>
                          {Object.entries(appraisal.responses).map(
                            ([email, feedback]) => (
                              <div key={email}>
                                <h5>Feedback for {email}</h5>
                                <p>
                                  <strong>Collaboration:</strong>{" "}
                                  {feedback.collaboration}
                                </p>
                                <p>
                                  <strong>Communication:</strong>{" "}
                                  {feedback.communication}
                                </p>
                                <p>
                                  <strong>Technical Skills:</strong>{" "}
                                  {feedback.skills}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                        <div className="remarks">
                          <h4>Remarks:</h4>
                          <p>
                            {appraisal.remarks[appraisal.submittedBy] ||
                              "No remarks provided."}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="appraisal-requests">
              <div className="container">
                <div>
                  {/* Employee Appraisals */}

                  <div className="content">
                    {employeeAppraisals.map((employee) => (
                      <div key={employee.email}>
                        {employee.appraisals.length != 0 &&
                          employee.appraisals.map((appraisal, index) => (
                            <div key={index} className="card">
                              <h3>{employee.name} Appraisal Data</h3>
                              <p>
                                <strong>Submitted By:</strong>{" "}
                                {appraisal.submittedBy}
                              </p>
                              <p>
                                <strong>Date:</strong>{" "}
                                {new Date(appraisal.date).toLocaleString()}
                              </p>
                              <div className="feedback">
                                <h4>Feedback:</h4>
                                {Object.entries(appraisal.responses).map(
                                  ([email, feedback]) => (
                                    <div key={email}>
                                      <h5>Feedback for {email}</h5>
                                      <p>
                                        <strong>Collaboration:</strong>{" "}
                                        {feedback.collaboration}
                                      </p>
                                      <p>
                                        <strong>Communication:</strong>{" "}
                                        {feedback.communication}
                                      </p>
                                      <p>
                                        <strong>Technical Skills:</strong>{" "}
                                        {feedback.skills}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="remarks">
                                <h4>Remarks:</h4>
                                <p>
                                  {appraisal.remarks[appraisal.submittedBy] ||
                                    "No remarks provided."}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="appraisal-requests">
          <div className="container">
            <div>
              {/* Manager's Submissions */}
              <div className="content">
                {managerAppraisals.length === 0 ? (
                  <p>No appraisals submitted by you.</p>
                ) : (
                  managerAppraisals.map((appraisal, index) => (
                    <div key={index} className="card">
                      <p>
                        <strong>Submitted By:</strong> {appraisal.submittedBy}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(appraisal.date).toLocaleString()}
                      </p>
                      <div className="feedback">
                        <h4>Feedback:</h4>
                        {Object.entries(appraisal.responses).map(
                          ([email, feedback]) => (
                            <div key={email}>
                              <h5>Feedback for {email}</h5>
                              <p>
                                <strong>Collaboration:</strong>{" "}
                                {feedback.collaboration}
                              </p>
                              <p>
                                <strong>Communication:</strong>{" "}
                                {feedback.communication}
                              </p>
                              <p>
                                <strong>Technical Skills:</strong>{" "}
                                {feedback.skills}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                      <div className="remarks">
                        <h4>Remarks:</h4>
                        <p>
                          {appraisal.remarks[appraisal.submittedBy] ||
                            "No remarks provided."}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppraisalRequests;
