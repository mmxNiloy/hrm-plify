export const DocumentTypes: [string, ...string[]] = [
  "PAYEE And Account Reference Letter From HMRC",
  "Latest RTI from Accountant",
  "Employer Liability Insurance Certificate",
  "Proof of Business Premises (Tenancy Agreement)",
  "Copy Of Lease Or Freehold Property",
  "Business Bank statement for 1 Month",
  "Business Bank statement for 2 Month",
  "Business Bank statement for 3 Month",
  "SIGNED Annual account (if the business is over 18 months old)",
  "VAT Certificate (if registered)",
  "Copy of Health and safety star Rating (Applicable for food business only)",
  "Registered Business License or Certificate",
  "Franchise Agreement",
  "Governing Body Registration",
  "Copy Of Health & Safety Star Rating",
  "Audited Annual Account (if you have)",
  "Regulatory body certificate if applicable to your business such as ACCA, FCA , OFCOM, IATA, ARLA",
  "Other Document",
];

export const SITE_NAME = "Revolo";

const SiteConfig = {
  title: {
    employmentType: `Employment Type | ${SITE_NAME}`,
    sysUsers: `System Users | ${SITE_NAME}`,
  },
  siteName: SITE_NAME,
  appName: `${SITE_NAME} HR`,
  siteDescription: "Control Compliance, Delete Stress",
  currentVersion: "1.4.0",
  maxFileSize: 5e6,
  featureFlags: {
    disableExperimentalUI: true,
    defaultCollapse: false,
  },
  data: {
    documentTypes: DocumentTypes,
  },
  defaultPageSize: 20,
  deployUrl: "https://revolohr.com",
};
export default SiteConfig;
