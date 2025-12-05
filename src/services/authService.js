
const users = [
  { email: "client.portal@ziing.ai", password: "Ziing@123", role: "client", name: "Client Portal" },
  { email: "admin.portal@ziing.ai", password: "Ziing@123", role: "admin", name: "Admin Portal" }
];

export const login = (email, password) => {
  const user = users.find(
    u => u.email === email && u.password === password
  );
  
  if (user) {
    return { success: true, user: { name: user.name, email: user.email, role: user.role } };
  } else {
    return { success: false, error: "Invalid email or password" };
  }
};
