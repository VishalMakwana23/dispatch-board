
const users = [
  { email: "client@ziing.ai", password: "Client@123", role: "client" },
  { email: "admin@ziing.ai", password: "Admin@123", role: "admin" }
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
