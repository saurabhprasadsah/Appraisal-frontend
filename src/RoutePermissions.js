const roleRoutes = {
  admin: ["/admin", "/appraisal/requests"],
  manager: ["/manager", "/appraisal/requests"],
  employee: ["/employee", "/appraisal/requests"],
  junior_employee: ["/employee", "/appraisal/requests"],
};

export const getAllowedRoutes = (role) => {
  return roleRoutes[role] || [];
};
