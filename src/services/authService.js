
const users = [
  { email: "client.portal@ziing.ai", password: "Ziing@123", role: "client" },
  { email: "admin.portal@ziing.ai", password: "Ziing@123", role: "admin" }
];

export const login = (email, password) => {
  const user = users.find(
    u => u.email === email && u.password === password
  );
  
  if (user) {
    return { success: true, role: user.role };
  } else {
    return { success: false, error: "Invalid email or password" };
  }
};
