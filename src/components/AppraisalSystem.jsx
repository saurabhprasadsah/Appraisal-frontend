import React, { useState, useEffect } from "react";
import { rawData } from "../Data";
import Dropdown from "./ui/Dropdown";

const AppraisalSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [accessibleUsers, setAccessibleUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [responses, setResponses] = useState({});
    const [remarks, setRemarks] = useState({});

    const MAX_SELECTION_LIMIT = 3; // Define the maximum selection limit

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setCurrentUser(loggedInUser);

        if (loggedInUser) {
            const users = getAccessibleUsers(loggedInUser);
            setAccessibleUsers(users);
        }
    }, []);

    const getAccessibleUsers = (loggedInUser) => {
        const { organization } = rawData;
        const allUsers = [];

        allUsers.push({ ...organization.admin });

        organization.managers.forEach((manager) => {
            allUsers.push({ ...manager });

            manager.employees.forEach((employee) => {
                allUsers.push({ ...employee });

                employee.junior_employees.forEach((junior) => {
                    allUsers.push({ ...junior });
                });
            });
        });

        if (loggedInUser.role === "admin") return allUsers;

        if (loggedInUser.role === "manager") {
            return allUsers.filter(
                (user) =>
                    user.role === "manager" ||
                    user.role === "employee" ||
                    user.role === "junior_employee" ||
                    user.email === loggedInUser.email
            );
        }

        if (loggedInUser.role === "employee") {
            return allUsers.filter(
                (user) =>
                    user.role === "junior_employee" || user.email === loggedInUser.email
            );
        }

        if (loggedInUser.role === "junior_employee") {
            return allUsers.filter((user) => user.email === loggedInUser.email);
        }

        return [];
    };

    const handleAddUser = (user) => {
        if (selectedUsers.length < MAX_SELECTION_LIMIT) {
            if (!selectedUsers.some((u) => u.email === user.email)) {
                setSelectedUsers([...selectedUsers, user]);
                setResponses((prev) => ({
                    ...prev,
                    [user.email]: { collaboration: 0, communication: 0, skills: 0 },
                }));
                setRemarks((prev) => ({ ...prev, [user.email]: "" }));
            }
        } else {
            alert(`You can only select up to ${MAX_SELECTION_LIMIT} users.`);
        }
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u.email !== user.email));
        const { [user.email]: _, ...rest } = responses;
        setResponses(rest);
        const { [user.email]: __, ...remainingRemarks } = remarks;
        setRemarks(remainingRemarks);
    };

    const handleResponseChange = (userEmail, question, value) => {
        setResponses((prev) => ({
            ...prev,
            [userEmail]: { ...prev[userEmail], [question]: value },
        }));
    };

    const handleRemarkChange = (userEmail, value) => {
        setRemarks((prev) => ({ ...prev, [userEmail]: value }));
    };

    const handleSubmit = () => {
        const appraisalData = {
            selectedUsers,
            responses,
            remarks,
            submittedBy: currentUser.name,
            date: new Date().toISOString(),
        };
    
        // Retrieve existing requests from localStorage
        const existingRequests = JSON.parse(localStorage.getItem("appraisalRequests")) || [];
    
        // Add the new request
        const updatedRequests = [...existingRequests, appraisalData];
    
        // Store back in localStorage
        localStorage.setItem("appraisalRequests", JSON.stringify(updatedRequests));
    
        alert("Appraisal submitted successfully!");
    
        // Reset state after submission
        setSelectedUsers([]);
        setResponses({});
        setRemarks({});
    };
    

    const filteredDropdownUsers = accessibleUsers.filter(
        (user) => !selectedUsers.some((selected) => selected.email === user.email)
    );

    return (
        <div className="appraisal-system">
            <div className="container">
                <div className="appraisal-header">
                    <h1>Appraisal System</h1>
                </div>
                <div className="content-container">
                    <div className="user-select-container">
                        <h2>Select Users for Appraisal</h2>
                        <div className="dropdown-container">
                            <Dropdown
                                options={filteredDropdownUsers.map(
                                    (user) => `${user.name} (${user.role})`
                                )}
                                selected={null}
                                placeholder={
                                    selectedUsers.length >= MAX_SELECTION_LIMIT
                                        ? "Limit Reached"
                                        : "Select a user"
                                }
                                onSelect={(selectedOption) => {
                                    const user = filteredDropdownUsers.find(
                                        (user) =>
                                            `${user.name} (${user.role})` === selectedOption
                                    );
                                    handleAddUser(user);
                                }}
                            />
                        </div>
                    </div>
                    <div className="question-card-container">
                        {selectedUsers.map((user) => (
                            <div key={user.email} className="question-container">
                                <div className="user-header">
                                    <h3>Feedback for {user.name}</h3>
                                    <div onClick={() => handleRemoveUser(user)} className="remove-btn">X</div>
                                </div>
                                <div className="question">
                                    <p>Team Collaboration:</p>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <label key={rating}>
                                            <input
                                                type="radio"
                                                name={`collaboration-${user.email}`}
                                                value={rating}
                                                checked={
                                                    responses[user.email]?.collaboration === rating
                                                }
                                                onChange={() =>
                                                    handleResponseChange(
                                                        user.email,
                                                        "collaboration",
                                                        rating
                                                    )
                                                }
                                            />
                                            {rating}
                                        </label>
                                    ))}
                                </div>
                                <div className="question">
                                    <p>Communication Skills:</p>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <label key={rating}>
                                            <input
                                                type="radio"
                                                name={`communication-${user.email}`}
                                                value={rating}
                                                checked={
                                                    responses[user.email]?.communication === rating
                                                }
                                                onChange={() =>
                                                    handleResponseChange(
                                                        user.email,
                                                        "communication",
                                                        rating
                                                    )
                                                }
                                            />
                                            {rating}
                                        </label>
                                    ))}
                                </div>
                                <div className="question">
                                    <p>Technical Skills:</p>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <label key={rating}>
                                            <input
                                                type="radio"
                                                name={`skills-${user.email}`}
                                                value={rating}
                                                checked={responses[user.email]?.skills === rating}
                                                onChange={() =>
                                                    handleResponseChange(user.email, "skills", rating)
                                                }
                                            />
                                            {rating}
                                        </label>
                                    ))}
                                </div>
                                <div className="remark">
                                    <p>Remark:</p>
                                    <textarea
                                        value={remarks[user.email] || ""}
                                        onChange={(e) =>
                                            handleRemarkChange(user.email, e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="appraisal-footer">

                    <button onClick={handleSubmit} disabled={selectedUsers.length === 0}>
                        Submit Appraisal Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppraisalSystem;
