const axios = require("axios");
const ZohoConnection = require("../../modal/admin/zohoCrmModal");
const ZohoMapping = require("../../modal/admin/ZohoMappingModal");
const ServiceLocation = require("../../modal/admin/serviceLocationModal");
const { getAccessToken } = require("../../utils/zohoToken");
const { encrypt } = require("../../utils/crypto");

// SAVE CONNECTION
exports.saveConnection = async (req, res) => {
  await ZohoConnection.findOneAndUpdate(
    { organization_id: req.user.organization_id },
    {
      client_id: req.body.client_id,
      client_secret: encrypt(req.body.client_secret),
      refresh_token: encrypt(req.body.refresh_token),
      api_domain: req.body.api_domain
    },
    { upsert: true }
  );
  res.json({ success: true });
};

exports.getConnection = async (req,res)=>{
 try{

  const data = await ZohoConnection.findOne({
   organization_id:req.user.organization_id
  });

  if(!data){
   return res.json(null);
  }

  res.json({
   client_id:data.client_id,
   client_secret:data.client_secret,
   refresh_token:data.refresh_token,
   api_domain:data.api_domain
  });

 }catch(err){
  res.status(500).json({message:err.message});
 }
};

// TEST
exports.testConnection = async (req, res) => {
  const conn = await ZohoConnection.findOne({
    organization_id: req.user.organization_id
  });

  const token = await getAccessToken(req.user.organization_id);

  const response = await axios.get(`${conn.api_domain}/crm/v2/org`, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` }
  });

  res.json(response.data);
};

// FIELDS
exports.getZohoFields = async (req, res) => {

  const conn = await ZohoConnection.findOne({
    organization_id: req.user.organization_id
  });

  const token = await getAccessToken(req.user.organization_id);

  const accounts = await axios.get(
    `${conn.api_domain}/crm/v2/settings/fields?module=Accounts`,
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );

  const contacts = await axios.get(
    `${conn.api_domain}/crm/v2/settings/fields?module=Contacts`,
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );

  res.json({
    accounts: accounts.data.fields,
    contacts: contacts.data.fields
  });
};

// MAPPING
exports.saveMappings = async (req, res) => {
  await ZohoMapping.findOneAndUpdate(
    { organization_id: req.user.organization_id },
    req.body,
    { upsert: true }
  );
  res.json({ success: true });
};

// SYNC
exports.syncLocations = async (req, res) => {

  const orgId = req.user.organization_id;

  const conn = await ZohoConnection.findOne({ organization_id: orgId });
  const mapping = await ZohoMapping.findOne({ organization_id: orgId });

  const token = await getAccessToken(orgId);

  const locations = await ServiceLocation.find({ organization_id: orgId });

  for (const loc of locations) {
    await axios.post(
      `${conn.api_domain}/crm/v2/Accounts`,
      {
        data: [
          {
            [mapping.company]: loc.company,
            [mapping.city]: loc.city,
            [mapping.state]: loc.state,
            [mapping.zip]: loc.zip
          }
        ]
      },
      {
        headers: { Authorization: `Zoho-oauthtoken ${token}` }
      }
    );
  }

  res.json({ success: true });
};