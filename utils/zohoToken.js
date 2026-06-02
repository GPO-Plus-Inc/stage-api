const axios = require("axios");
const qs = require("qs");
const ZohoConnection = require("../modal/admin/zohoCrmModal");
const { decrypt } = require("./crypto");

exports.getAccessToken = async (orgId) => {

  const conn = await ZohoConnection.findOne({ organization_id: orgId });

  const res = await axios.post(
    "https://accounts.zoho.com/oauth/v2/token",
    qs.stringify({
      grant_type: "refresh_token",
      client_id: conn.client_id,
      client_secret: decrypt(conn.client_secret),
      refresh_token: decrypt(conn.refresh_token)
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

  return res.data.access_token;
};