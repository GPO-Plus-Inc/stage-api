const Role = require("../models/role.model");
const permissions = require("../config/permissions");

async function seedRoles(orgId) {

  await Role.create([
    {
      name: "Admin",
      organization_id: orgId,
      permissions: Object.values(permissions)
    },

    {
      name: "Technician",
      organization_id: orgId,
      permissions: [
        permissions.JOB_VIEW,
        permissions.JOB_UPDATE
      ]
    },

    {
      name: "Dispatch Manager",
      organization_id: orgId,
      permissions: [
        permissions.JOB_VIEW,
        permissions.JOB_CREATE,
        permissions.JOB_ASSIGN
      ]
    },

    {
      name: "Billing Manager",
      organization_id: orgId,
      permissions: [
        permissions.INVOICE_VIEW,
        permissions.INVOICE_CREATE
      ]
    },

    {
      name: "Sales Manager",
      organization_id: orgId,
      permissions: [
        permissions.CLIENT_VIEW,
        permissions.CLIENT_CREATE,
        permissions.ESTIMATE_CREATE
      ]
    }

  ]);

}

module.exports = seedRoles;