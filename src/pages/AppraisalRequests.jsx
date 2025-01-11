import React, { useState, useEffect } from "react";

const AppraisalRequests = () => {
    const [requests, setRequests] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Retrieve the logged-in user and determine if they are an admin
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(user);
        setIsAdmin(user?.role === "admin");

        // Retrieve appraisal requests from localStorage
        const storedRequests = JSON.parse(localStorage.getItem("appraisalRequests")) || [];
        setRequests(storedRequests);
    }, []);

    const handleApprove = (index) => {
        const updatedRequests = [...requests];
        updatedRequests[index].approved = true;

        // Update localStorage with approved requests
        localStorage.setItem("appraisalRequests", JSON.stringify(updatedRequests));
        setRequests(updatedRequests);

        alert("Request approved successfully.");
    };

    // Filter requests based on the user's role
    const visibleRequests = isAdmin
        ? requests
        : requests.filter((request) => request.submittedBy === loggedInUser?.name);

    return (
        <div className="appraisal-requests">
            <div className="container">
                <h1>Appraisal Requests</h1>
                <div className="content">
                    {visibleRequests.length === 0 ? (
                        <p>No appraisal requests found.</p>
                    ) : (
                        visibleRequests.map((request, index) => (
                            <div key={index} className="request-card">
                                <h3>Submitted By: {request.submittedBy}</h3>
                                <p>Date: {new Date(request.date).toLocaleString()}</p>
                                <div className="selected-users">
                                    <h4>Selected Users:</h4>
                                    <ul>
                                        {request.selectedUsers.map((user) => (
                                            <li key={user.email}>
                                                {user.name} ({user.role})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="feedback">
                                    <h4>Feedback:</h4>
                                    {request.selectedUsers.map((user) => (
                                        <div key={user.email} className="user-feedback">
                                            <h5>{user.name} ({user.role})</h5>
                                            <p><strong>Collaboration:</strong> {request.responses[user.email]?.collaboration}</p>
                                            <p><strong>Communication:</strong> {request.responses[user.email]?.communication}</p>
                                            <p><strong>Technical Skills:</strong> {request.responses[user.email]?.skills}</p>
                                            <p><strong>Remark:</strong> {request.remarks[user.email] || "No remarks provided."}</p>
                                        </div>
                                    ))}
                                </div>
                                {isAdmin && (
                                    <div className="admin-actions">
                                        {request.approved ? (
                                            <p className="approved-label">Approved</p>
                                        ) : (
                                            <button
                                                className="approve-button"
                                                onClick={() => handleApprove(index)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppraisalRequests;
