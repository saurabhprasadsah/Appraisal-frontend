export const rawData = {
  "organization": {
    "admin": {
      "name": "Admin Name",
      "email": "admin@example.com",
      "password": "adminPassword123",
      "role": "admin"
    },
    "managers": [
      {
        "name": "Manager One",
        "email": "manager1@example.com",
        "password": "manager1Password123",
        "role": "manager",
        "employees": [
          {
            "name": "Employee One",
            "email": "employee1@example.com",
            "password": "employee1Password123",
            "role": "employee",
            "junior_employees": [
              {
                "name": "Junior Employee One",
                "email": "junior1@example.com",
                "password": "junior1Password123",
                "role": "junior_employee"
              }
            ]
          },
          {
            "name": "Employee Two",
            "email": "employee2@example.com",
            "password": "employee2Password123",
            "role": "employee",
            "junior_employees": []
          },
          {
            "name": "Employee Three",
            "email": "employee3@example.com",
            "password": "employee3Password123",
            "role": "employee",
            "junior_employees": []
          }
        ]
      },
      {
        "name": "Manager Two",
        "email": "manager2@example.com",
        "password": "manager2Password123",
        "role": "manager",
        "employees": [
          {
            "name": "Employee Four",
            "email": "employee4@example.com",
            "password": "employee4Password123",
            "role": "employee",
            "junior_employees": [
              {
                "name": "Junior Employee Two",
                "email": "junior2@example.com",
                "password": "junior2Password123",
                "role": "junior_employee"
              }
            ]
          },
          {
            "name": "Employee Five",
            "email": "employee5@example.com",
            "password": "employee5Password123",
            "role": "employee",
            "junior_employees": []
          },
          {
            "name": "Employee Six",
            "email": "employee6@example.com",
            "password": "employee6Password123",
            "role": "employee",
            "junior_employees": []
          }
        ]
      }
    ]
  }
}
