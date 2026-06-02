const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Organization = require("./modal/admin/organizationModal");
const Role = require("./modal/admin/roleModal");
const User = require("./modal/admin/userModal");

mongoose.connect("mongodb://127.0.0.1:27017/prismplusservice");

async function seedAdmin() {

  // 1️⃣ Organization create
  const organization = await Organization.create({
    name: "Default Organization"
  });

  // 2️⃣ Role create
  const role = await Role.create({
    name: "Admin",
    organization_id: organization._id,
    permissions: [
      "user.create",
      "user.view",
      "user.update",
      "user.delete",
      "role.create",
      "role.view",
      "role.update",
      "role.delete"
    ]
  });

  // 3️⃣ password hash
  const password = await bcrypt.hash("123456", 10);

  // 4️⃣ Admin user create
  await User.create({
    name: "Super Admin",
    email: "admin@test.com",
    password,
    role_id: role._id,
    organization_id: organization._id
  });

  console.log("Admin setup completed");

  process.exit();
}

seedAdmin();