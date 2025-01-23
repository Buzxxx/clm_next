export const vendors = [
  {
    id: "1",
    vendorName: "Basware",
    logo: "/contracts/images/vendors/basware.svg",
    email: "contact@basware.com",
    website: "https://www.basware.com/en-us",
    estYr: 1985,
    description:
      "Basware’s procurement-to-pay solution offers comprehensive visibility into organizational spending, particularly on assets. The system efficiently collects cost and warranty information, helping users conduct life cycle comparisons, track assets under warranties, and manage service contracts. With its focus on proper asset depreciation, the solution ensures that companies get the most out of their equipment investments. By identifying bulk ordering opportunities, it helps reduce unnecessary spending and ensures that critical items remain in stock, optimizing inventory and cash flow management. Additionally, the platform provides insights into both purchase order and non-purchase order spend, enabling organizations to streamline supplier relationships and negotiate more favorable contracts. This real-time access to procurement data helps users make informed buying decisions, contributing to better overall spend management and procurement efficiency.",

    vendorServices: "Procurement",
    vendorMatchPercentage: 85,
    isVerified: true,
    regions: [1, 2, 3, 4],
    capabilities: [1, 2, 3],
    organizationalFunctions: [2, 4],
    contractTypes: [1, 5],
    licensingModels: [1],
    integrations: [1, 3],
  },
  {
    id: "2",
    vendorName: "Jaggaer",
    logo: "/contracts/images/vendors/Jaggaer-Logo-Red.svg",
    email: "gholt@jaggaer.com",
    website: "https://www.jaggaer.com",
    estYr: 1995,
    description:
      "JAGGAER Contracts offers a comprehensive solution for managing every stage of contract development, from initiation to approval and execution. It is integrated within JAGGAER ONE, featuring automated workflows for authoring, review, and approval, reducing risks and enhancing compliance. The system provides complete lifecycle management, including automated alerts for contract renewals, expirations, and other key milestones. Key capabilities include a centralized contract repository, automated alerting, electronic signing via DocuSign, and full integration with the Bravo Advantage suite. By aligning contracts with purchasing decisions, the platform ensures a closed-loop process, driving on-contract purchasing. The guided authoring tools, templates, and clause libraries streamline the process while maintaining compliance. Users can also push sourcing and supplier data to contracts and populate purchasing catalogs and POs with contract terms. The platform measures supplier performance against contract terms, ensuring efficient procurement activities that are fully integrated with sourcing, supplier management, and accounts payable functions.",

    vendorServices: "Spend Management, Procurement",
    vendorMatchPercentage: 95,
    isVerified: true,
    regions: [1, 3, 4],
    capabilities: [1, 2, 5],
    organizationalFunctions: [1, 3],
    contractTypes: [1, 3, 5],
    licensingModels: [1, 3],
    integrations: [2, 4],
  },
  {
    id: "3",
    vendorName: "Cobblestone Systems",
    logo: "/contracts/images/vendors/cobblestone.svg",
    email: "sales@cobblestonesoftware.com",
    website: "https://www.cobblestonesystems.com/",
    estYr: 1995,
    description:
      "Cobblestone's flagship product, Contract Insight Enterprise, is a comprehensive solution for contract lifecycle management, praised by clients as an effective tool for organizational needs. It offers features like contract tracking, authoring with dynamic clauses, approval workflows, eSignatures, and online negotiation. The platform also supports procurement management, user-defined fields, custom reporting, email alerts, and compliance monitoring. It incorporates advanced technologies like Artificial Intelligence and Machine Learning for risk mitigation and opportunity identification. Contract Insight Enterprise helps organizations manage unlimited contracts, commitments, and obligations through a secure web-based platform. Authorized users can track contracts by various parameters, configure fields for classification, search, and reporting, and benefit from workflow automation with email alerts. Other features include document versioning, vendor/client negotiations, milestone tracking, and collaboration tools. Available as both a SaaS/cloud solution or an on-premise deployment, it is built on modern .NET technologies and accessible via desktop or mobile apps on iOS and Android.",

    vendorServices: "Contract Management",
    vendorMatchPercentage: 90,
    isVerified: true,
    regions: [1, 4],
    capabilities: [1, 2, 4],
    organizationalFunctions: [2, 4, 5],
    contractTypes: [1, 4],
    licensingModels: [1, 2],
    integrations: [1, 3],
  },
  {
    id: "4",
    vendorName: "CallidusCloud",
    logo: "/contracts/images/vendors/calliduscloud.svg",
    email: "contact@calliduscloud.com",
    website:
      "https://www.sap.com/products/acquired-brands/what-is-calliduscloud.html",
    estYr: 1996,
    description:
      "CallidusCloud streamlines contract negotiations by automating the exchange of redlined contracts through a secure portal, allowing for faster reviews and stakeholder routing. It efficiently tracks redlining activities and manages changes while integrating with CRM systems to keep opportunities updated. Contracts are stored in a secure repository, ensuring a single, centralized location for all documents. Additionally, the platform helps users stay on top of contract milestones and renewals to maintain compliance and optimize the contract lifecycle.",

    vendorServices: "Sales Automation",
    vendorMatchPercentage: 88,
    isVerified: true,
    regions: [1, 2, 3],
    capabilities: [1, 3, 4],
    organizationalFunctions: [2, 5],
    contractTypes: [1, 2],
    licensingModels: [1],
    integrations: [1, 3],
  },
  {
    id: "5",
    vendorName: "Navantis",
    logo: "/contracts/images/vendors/navantis.svg",
    email: "info@navantis.com",
    website: "https://www.navantis.com/",
    estYr: 1998,
    description:
      "The platform includes a contracts repository for centralized storage and a contract creation wizard to streamline the contract drafting process. It was acquired by Datavail in 2017, enhancing its offerings and industry presence.",

    vendorServices: "Contract Management, Procurement",
    vendorMatchPercentage: 80,
    isVerified: true,
    regions: [1, 2],
    capabilities: [5, 6],
    organizationalFunctions: [2, 4],
    contractTypes: [1, 4],
    licensingModels: [1, 5],
    integrations: [2, 4],
  },
  {
    id: "6",
    vendorName: "Blue Ridge Software (DBA Contract Assistant)",
    logo: "/contracts/images/vendors/blueridge.svg",
    email: "support@contractassistant.com",
    website: "http://contractassistant.com/",
    estYr: 2002,
    description:
      "The Standard Edition is tailored for single users and small businesses, offering easy installation without IT help and an intuitive Windows interface. It provides an electronic record of contracts, multiple alarms for deadlines, and an index display for quick access. Users can customize fields, link files to contracts, and categorize key elements with unlimited flexibility. It features financial summary fields, extensive search capabilities, and a library of 40+ reports. Enhanced custom reporting is also available as an optional feature. The Pro Edition expands on this by allowing 5 user accounts (with more available) and includes a report designer for building custom reports. It offers user privileges for read-only or update access, along with a comprehensive search system. The Pro Edition also provides an administrator's guide and a library of starter reports for contract management. The Enterprise Edition is SQL Server-based, designed for scalability and power. It offers email notifications for custom and recurring alarms, flexible user permissions assigned by roles, groups, or individual users, and database storage of contracts and related documents. This edition includes full-text search capabilities, customizable viewable fields, and an advanced report designer with even more starter reports to help businesses manage their contracts efficiently.",

    vendorServices: "Contract Management",
    vendorMatchPercentage: 75,
    isVerified: false,
    regions: [1, 4],
    capabilities: [4, 7],
    organizationalFunctions: [2, 5],
    contractTypes: [1, 3],
    licensingModels: [1, 3],
    integrations: [1, 2],
  },
  {
    id: "7",
    vendorName: "Gimmal",
    logo: "/contracts/images/vendors/gimmal.svg",
    email: "contact@gimmal.com",
    website: "https://gimmal.com/",
    estYr: 2002,
    description:
      "Gimmal provides contract management solutions with integration capabilities and a centralized repository. Offers advanced features like obligation tracking, automated alerts, and collaboration tools.",

    vendorServices: "Contract Management, Procurement",
    vendorMatchPercentage: 78,
    isVerified: true,
    regions: [1, 2, 3],
    capabilities: [5, 6, 7],
    organizationalFunctions: [2, 4],
    contractTypes: [1, 5],
    licensingModels: [1, 2],
    integrations: [2, 4],
  },
  {
    id: "8",
    vendorName: "Contract Logix",
    logo: "/contracts/images/vendors/contractlogix.svg",
    email: "support@contractlogix.com",
    website: "https://www.contractlogix.com/",
    estYr: 2006,
    description:
      "Contract Logix offers Express, Professional, and Enterprise CLM platforms, providing contract repository solutions with optional contract authoring, built-in obligation notifications, and e-signature integration.",

    vendorServices: "Contract Management",
    vendorMatchPercentage: 82,
    isVerified: true,
    regions: [1, 2, 4],
    capabilities: [2, 4, 6],
    organizationalFunctions: [2, 4],
    contractTypes: [1, 3],
    licensingModels: [1, 2],
    integrations: [1, 3],
  },
  {
    id: "9",
    vendorName: "Convergepoint",
    logo: "/contracts/images/vendors/convergepoint.svg",
    email: "info@convergepoint.com",
    website: "https://www.convergepoint.com/contract-management-software",
    estYr: 2006,
    description:
      "Convergepoint offers contract lifecycle management software with features like contract creation, obligation tracking, and advanced contract repository integration. It supports third-party integrations and tailored solutions for various industries.",

    vendorServices: "Contract Management, Procurement",
    vendorMatchPercentage: 77,
    isVerified: false,
    regions: [1, 4],
    capabilities: [3, 6],
    organizationalFunctions: [2, 5],
    contractTypes: [1, 4, 5],
    licensingModels: [3, 5],
    integrations: [1, 4],
  },
  {
    id: "10",
    vendorName: "ContractPod Ai",
    logo: "/contracts/images/vendors/contractpodai.svg",
    email: "info@contractpodai.com",
    website: "https://contractpodai.com/",
    estYr: 2012,
    description:
      "ContractPod Ai offers a suite of contract lifecycle management tools with AI-driven contract analysis, customizable templates, built-in negotiation portals, and integration with Microsoft Azure for secure hosting.",

    vendorServices: "Contract Management, AI Tools",
    vendorMatchPercentage: 85,
    isVerified: true,
    regions: [1, 2, 3],
    capabilities: [1, 3, 5],
    organizationalFunctions: [1, 2, 5],
    contractTypes: [1, 5],
    licensingModels: [1, 3, 5],
    integrations: [1, 2, 3],
  },
];

export const regions = [
  { id: 1, name: "APAC" },
  { id: 2, name: "EMEA" },
  { id: 3, name: "LATM " },
  { id: 4, name: "North America" },
];

export const capabilities = [
  { id: 1, name: "Change Management" },
  { id: 2, name: "Configurable Approval Workflows" },
  { id: 3, name: "AI Built in" },
  { id: 4, name: "Version Comparison Redlining & Negotiation" },
  { id: 5, name: "Repository and Integration Capabilities" },
  { id: 6, name: "Custom Reporting and Queries" },
  { id: 7, name: "Obligation Tracking and Upload of Evidence" },
];

export const organizationalFunctions = [
  { id: 1, name: "Commercial" },
  { id: 2, name: "Legal" },
  { id: 3, name: "Other Dept" },
  { id: 4, name: "Procurement" },
  { id: 5, name: "Risk/Compliance" },
];

export const contractTypes = [
  { id: 1, name: "Buy Side" },
  { id: 2, name: "Distribution" },
  { id: 3, name: "Employment" },
  { id: 4, name: "Other Type" },
  { id: 5, name: "Sell Side" },
];

export const licensingModels = [
  { id: 1, name: "Annual subscription fee" },
  { id: 2, name: "Annual subscription fee with maintenance" },
  { id: 3, name: "Monthly subscription fee" },
  { id: 4, name: "Perpetual" },
  { id: 5, name: "Volume-based" },
];

export const integrations = [
  { id: 1, name: "Application Integration (API)" },
  { id: 2, name: "E-mail Client" },
  { id: 3, name: "eSignatures" },
  { id: 4, name: "Financials and Supply Chain Management (FSCM)" },
];
