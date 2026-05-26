import { PrismaClient, Severity, Priority } from '@prisma/client';

const prisma = new PrismaClient();

interface RegulationSeed {
  name: string;
  shortName: string;
  category: string;
  severity: Severity;
  region: string;
  affectedArea: string;
  summary: string;
  fullDescription: string;
  whatChanged: string;
  deadline: Date | null;
  publishedAt: Date;
  actionItems: {
    title: string;
    description: string;
    priority: Priority;
    techStackRelevance: string[];
  }[];
}

const regulations: RegulationSeed[] = [
  {
    name: 'GDPR Article 17 - Right to Erasure Update',
    shortName: 'GDPR Art. 17',
    category: 'Privacy',
    severity: Severity.CRITICAL,
    region: 'EU',
    affectedArea: 'User Data Management',
    summary: 'The European Data Protection Board has issued updated guidance on the Right to Erasure under GDPR Article 17. Organizations must now provide automated deletion mechanisms and respond to erasure requests within 72 hours instead of 30 days for certain categories of data.',
    fullDescription: 'The EDPB has strengthened enforcement of Article 17 with new technical standards for data erasure. Organizations processing EU resident data must implement automated deletion workflows, maintain deletion audit logs, and ensure cascade deletion across all backup systems within specified timeframes. Non-compliance penalties have been increased to 4% of global annual turnover or EUR 20 million.',
    whatChanged: 'Response time reduced from 30 days to 72 hours for sensitive data categories. Automated deletion mechanisms now mandatory. Backup system erasure must be verifiable. New audit trail requirements for all deletion requests.',
    deadline: new Date('2024-09-01'),
    publishedAt: new Date('2024-03-15'),
    actionItems: [
      { title: 'Add user data deletion endpoint at /api/user/delete', description: 'Implement a REST endpoint that accepts authenticated deletion requests and initiates the cascade deletion workflow for all user data.', priority: Priority.HIGH, techStackRelevance: ['web', 'api', 'database'] },
      { title: 'Implement cascade deletion for user-generated content', description: 'Ensure all user-generated content including posts, comments, uploads, and metadata are deleted when a user exercises their right to erasure.', priority: Priority.HIGH, techStackRelevance: ['web', 'database', 'storage'] },
      { title: 'Add data export functionality (DSAR compliance)', description: 'Build a data subject access request export feature that generates a downloadable archive of all user data in a portable format.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'api', 'storage'] },
      { title: 'Update privacy policy page with erasure request process', description: 'Document the erasure request process, expected timelines, and user rights clearly on the privacy policy page.', priority: Priority.LOW, techStackRelevance: ['web', 'legal'] },
    ],
  },
  {
    name: 'GDPR Data Breach Notification Requirements Update',
    shortName: 'GDPR Breach Notify',
    category: 'Privacy',
    severity: Severity.CRITICAL,
    region: 'EU',
    affectedArea: 'Security & Incident Response',
    summary: 'Updated breach notification requirements now mandate real-time monitoring systems and automated breach detection. Organizations must notify supervisory authorities within 24 hours for high-risk breaches, down from 72 hours.',
    fullDescription: 'The updated GDPR breach notification framework requires organizations to implement continuous monitoring for data breaches, maintain incident response playbooks, and demonstrate automated detection capabilities during audits. High-risk breaches affecting more than 1000 data subjects must be reported within 24 hours.',
    whatChanged: 'Notification window reduced to 24 hours for high-risk breaches. Automated breach detection systems now required. Incident response playbooks must be documented and tested quarterly. Affected individuals must be notified within 48 hours.',
    deadline: new Date('2024-07-01'),
    publishedAt: new Date('2024-01-20'),
    actionItems: [
      { title: 'Implement automated breach detection monitoring', description: 'Set up real-time monitoring for unauthorized data access patterns and anomalous database queries that could indicate a breach.', priority: Priority.HIGH, techStackRelevance: ['aws', 'gcp', 'azure', 'security'] },
      { title: 'Create incident response notification system', description: 'Build an automated notification pipeline that alerts the security team and triggers compliance workflows within minutes of breach detection.', priority: Priority.HIGH, techStackRelevance: ['web', 'api', 'email'] },
      { title: 'Document and test incident response playbook', description: 'Create a comprehensive incident response playbook and schedule quarterly tabletop exercises to validate the process.', priority: Priority.MEDIUM, techStackRelevance: ['security', 'operations'] },
    ],
  },
  {
    name: 'CCPA/CPRA Amendment - Universal Opt-Out Mechanisms',
    shortName: 'CCPA/CPRA Opt-Out',
    category: 'Privacy',
    severity: Severity.WARNING,
    region: 'US-California',
    affectedArea: 'Consent Management',
    summary: 'California has mandated support for Global Privacy Control (GPC) signals as a valid opt-out mechanism. Businesses must honor browser-level privacy signals and cannot require additional opt-out steps when GPC is detected.',
    fullDescription: 'The CPRA amendment requires all businesses subject to California privacy law to recognize and honor Global Privacy Control signals sent by user browsers. This means websites must detect the Sec-GPC HTTP header and automatically opt users out of data sale and sharing without requiring them to interact with cookie banners or preference centers.',
    whatChanged: 'GPC signal detection now mandatory. Cookie consent banners must auto-apply opt-out when GPC detected. Do Not Sell link must remain visible regardless of GPC status. Annual compliance audits required for businesses processing data of 100K+ California residents.',
    deadline: new Date('2024-07-01'),
    publishedAt: new Date('2024-02-10'),
    actionItems: [
      { title: 'Implement Global Privacy Control (GPC) signal detection', description: 'Detect the Sec-GPC header in incoming requests and automatically apply opt-out preferences for data sale and sharing.', priority: Priority.HIGH, techStackRelevance: ['web', 'api', 'privacy'] },
      { title: 'Update consent management platform for GPC compliance', description: 'Modify the cookie consent banner to auto-apply opt-out settings when a GPC signal is present without prompting the user.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'frontend', 'privacy'] },
      { title: 'Add "Do Not Sell My Info" link to footer', description: 'Ensure a visible Do Not Sell or Share My Personal Information link is present in the website footer on all pages.', priority: Priority.LOW, techStackRelevance: ['web', 'frontend'] },
    ],
  },
  {
    name: 'Apple App Store - Privacy Nutrition Labels Requirement',
    shortName: 'Apple Privacy Labels',
    category: 'AppStore',
    severity: Severity.CRITICAL,
    region: 'Global',
    affectedArea: 'App Store Compliance',
    summary: 'Apple now requires all apps to declare detailed privacy nutrition labels including third-party SDK data collection. Apps without complete privacy labels will be rejected during review starting Q3 2024.',
    fullDescription: 'Apple has expanded the privacy nutrition label requirements to include granular disclosure of all third-party SDK data collection practices. Developers must audit every dependency in their app for data collection behavior and declare it in App Store Connect. Privacy manifests are now required for all third-party frameworks.',
    whatChanged: 'Third-party SDK data collection must be individually declared. Privacy manifests required for all frameworks. App review will reject submissions with incomplete labels. Quarterly re-certification of privacy labels required.',
    deadline: new Date('2024-08-01'),
    publishedAt: new Date('2024-02-28'),
    actionItems: [
      { title: 'Add privacy nutrition label to App Store Connect', description: 'Complete the privacy nutrition label questionnaire in App Store Connect with accurate data collection and usage declarations.', priority: Priority.HIGH, techStackRelevance: ['ios', 'app-store'] },
      { title: 'Implement ATT (App Tracking Transparency) prompt', description: 'Add the App Tracking Transparency framework prompt to request user permission before accessing the IDFA for tracking purposes.', priority: Priority.HIGH, techStackRelevance: ['ios', 'app-store', 'mobile'] },
      { title: 'Remove third-party SDKs without Apple privacy manifests', description: 'Audit all third-party SDKs and remove or replace any that do not include the required PrivacyInfo.xcprivacy manifest file.', priority: Priority.MEDIUM, techStackRelevance: ['ios', 'app-store', 'mobile'] },
      { title: 'Create privacy manifest for first-party code', description: 'Generate a PrivacyInfo.xcprivacy file documenting all required reason APIs used by your app and the justification for each.', priority: Priority.MEDIUM, techStackRelevance: ['ios', 'app-store'] },
    ],
  },
  {
    name: 'Apple App Store - In-App Purchase Policy Change',
    shortName: 'Apple IAP Policy',
    category: 'AppStore',
    severity: Severity.WARNING,
    region: 'Global',
    affectedArea: 'Payments & Monetization',
    summary: 'Apple has updated in-app purchase policies allowing external payment links for certain app categories in the EU. Apps must still use StoreKit for digital goods but can now inform users about alternative purchase options.',
    fullDescription: 'Following EU Digital Markets Act enforcement, Apple now permits apps distributed in the EU to include links to external payment mechanisms for digital goods and services. Apps must implement the new StoreKit External Purchase API and display Apple-mandated disclosure sheets before redirecting users. Commission rates are adjusted to 17% for external transactions.',
    whatChanged: 'External payment links allowed in EU region. New StoreKit External Purchase API must be used. Apple-mandated disclosure sheet required before redirect. 17% commission on external transactions. Apps must report external transactions to Apple.',
    deadline: null,
    publishedAt: new Date('2024-03-01'),
    actionItems: [
      { title: 'Evaluate StoreKit External Purchase API implementation', description: 'Review the new StoreKit External Purchase API and determine if implementing external payment links is beneficial for EU users of the app.', priority: Priority.MEDIUM, techStackRelevance: ['ios', 'app-store', 'payments'] },
      { title: 'Implement Apple-mandated disclosure sheet for external links', description: 'If using external payments, implement the required disclosure sheet that Apple mandates before redirecting users to external purchase flows.', priority: Priority.LOW, techStackRelevance: ['ios', 'app-store', 'payments'] },
      { title: 'Set up external transaction reporting to Apple', description: 'Build a reporting mechanism to send transaction data to Apple for purchases completed through external payment links as required.', priority: Priority.LOW, techStackRelevance: ['ios', 'app-store', 'payments', 'api'] },
    ],
  },
  {
    name: 'Google Play Store - Data Safety Section Requirements',
    shortName: 'Play Data Safety',
    category: 'AppStore',
    severity: Severity.WARNING,
    region: 'Global',
    affectedArea: 'App Store Compliance',
    summary: 'Google Play now enforces strict data safety section accuracy with automated scanning. Apps with discrepancies between declared and actual data practices face removal from the store without prior warning.',
    fullDescription: 'Google has implemented automated code scanning to verify data safety declarations against actual app behavior. The Play Console now cross-references declared data types with detected SDK behaviors and API calls. Any discrepancy triggers an immediate policy strike, and repeated violations result in app suspension.',
    whatChanged: 'Automated scanning now verifies data safety declarations. Discrepancies result in immediate policy strikes. All data sharing with third parties must be declared including analytics SDKs. Data deletion option must be provided and functional.',
    deadline: new Date('2024-06-15'),
    publishedAt: new Date('2024-01-15'),
    actionItems: [
      { title: 'Audit data safety section accuracy in Play Console', description: 'Review and update the data safety section in Google Play Console to accurately reflect all data types collected and shared by the app.', priority: Priority.HIGH, techStackRelevance: ['android', 'play-store'] },
      { title: 'Implement in-app account and data deletion', description: 'Provide a functional account deletion option within the app that removes all user data as declared in the data safety section.', priority: Priority.HIGH, techStackRelevance: ['android', 'play-store', 'api'] },
      { title: 'Document all third-party SDK data practices', description: 'Create an inventory of all third-party SDKs, their data collection practices, and ensure each is properly declared in the data safety section.', priority: Priority.MEDIUM, techStackRelevance: ['android', 'play-store', 'mobile'] },
    ],
  },
  {
    name: 'Google Play Store - Target API Level Requirement',
    shortName: 'Play Target API',
    category: 'AppStore',
    severity: Severity.CRITICAL,
    region: 'Global',
    affectedArea: 'Mobile Development',
    summary: 'Google Play requires all app updates to target Android 14 (API level 34) by August 31, 2024. Existing apps must target API 33 minimum. Apps not meeting requirements will be hidden from new users on newer devices.',
    fullDescription: 'Google enforces annual target API level requirements to ensure apps leverage the latest security and privacy features. Starting August 31, 2024, all new app submissions and updates must target API level 34. Existing apps that do not update will be progressively hidden from users on devices running Android 14+, significantly impacting discoverability.',
    whatChanged: 'New apps and updates must target API 34 by August 31, 2024. Existing apps hidden on newer devices if targeting below API 33. New foreground service type declarations required. Photo and video permissions model changed. Predictive back gesture support recommended.',
    deadline: new Date('2024-08-31'),
    publishedAt: new Date('2024-02-01'),
    actionItems: [
      { title: 'Update targetSdkVersion to API level 34', description: 'Update the app build configuration to target Android 14 (API level 34) and resolve all deprecation warnings and breaking changes.', priority: Priority.HIGH, techStackRelevance: ['android', 'play-store', 'mobile'] },
      { title: 'Declare foreground service types', description: 'Add the required foreground service type declarations in the manifest for all foreground services used by the app.', priority: Priority.HIGH, techStackRelevance: ['android', 'mobile'] },
      { title: 'Migrate to new photo/video permissions model', description: 'Update media access code to use the new granular photo and video permissions introduced in API 34 instead of READ_EXTERNAL_STORAGE.', priority: Priority.MEDIUM, techStackRelevance: ['android', 'mobile'] },
    ],
  },
  {
    name: 'PCI DSS v4.0 Migration Deadline',
    shortName: 'PCI DSS v4.0',
    category: 'Security',
    severity: Severity.CRITICAL,
    region: 'Global',
    affectedArea: 'Payment Processing',
    summary: 'PCI DSS v3.2.1 retires on March 31, 2025. All organizations handling payment card data must be fully compliant with PCI DSS v4.0 requirements including new e-commerce security controls and script monitoring.',
    fullDescription: 'PCI DSS v4.0 introduces significant new requirements for e-commerce and card-not-present transactions. Key changes include mandatory script integrity monitoring on payment pages, enhanced authentication requirements, and new encryption standards. Organizations must complete a gap assessment and remediation plan well before the March 2025 deadline.',
    whatChanged: 'Client-side script monitoring required on payment pages. HTTP headers must be monitored for tampering. Multi-factor authentication required for all admin access. Automated log review mechanisms mandatory. Custom approach for meeting requirements now allowed.',
    deadline: new Date('2025-03-31'),
    publishedAt: new Date('2024-01-05'),
    actionItems: [
      { title: 'Implement payment page script integrity monitoring', description: 'Deploy a Content Security Policy and script integrity monitoring solution for all payment pages to detect unauthorized script modifications.', priority: Priority.HIGH, techStackRelevance: ['web', 'payments', 'security'] },
      { title: 'Enable MFA for all administrative access', description: 'Implement multi-factor authentication for all admin panel access, server SSH, and payment system dashboards as required by v4.0.', priority: Priority.HIGH, techStackRelevance: ['web', 'api', 'security', 'aws'] },
      { title: 'Set up automated security log review', description: 'Deploy automated log analysis tools that review security logs daily and alert on anomalous patterns related to payment data access.', priority: Priority.MEDIUM, techStackRelevance: ['aws', 'gcp', 'security', 'operations'] },
      { title: 'Deploy Content Security Policy headers on payment pages', description: 'Configure strict CSP headers on all pages that handle payment card data to prevent injection of unauthorized scripts.', priority: Priority.HIGH, techStackRelevance: ['web', 'payments', 'security'] },
    ],
  },
  {
    name: 'PCI DSS v4.0 - New Authentication Requirements',
    shortName: 'PCI DSS Auth',
    category: 'Security',
    severity: Severity.WARNING,
    region: 'Global',
    affectedArea: 'Authentication & Access Control',
    summary: 'PCI DSS v4.0 mandates password length minimum of 12 characters, automated account lockout after 10 failed attempts, and session timeout of 15 minutes for payment system access.',
    fullDescription: 'The new authentication requirements under PCI DSS v4.0 strengthen access controls for any system component in the cardholder data environment. Passwords must be minimum 12 characters with complexity requirements. Account lockout must occur after 10 failed attempts with a minimum 30-minute lockout period. Idle sessions must terminate after 15 minutes.',
    whatChanged: 'Minimum password length increased from 7 to 12 characters. Failed attempt lockout threshold set at 10 attempts. Session idle timeout must be 15 minutes maximum. Password history must prevent reuse of last 4 passwords. Service accounts must have unique passwords per system.',
    deadline: new Date('2025-03-31'),
    publishedAt: new Date('2024-02-15'),
    actionItems: [
      { title: 'Update password policy to 12-character minimum', description: 'Modify user registration and password change flows to enforce a minimum 12-character password length with complexity requirements.', priority: Priority.HIGH, techStackRelevance: ['web', 'api', 'payments', 'security'] },
      { title: 'Implement account lockout after 10 failed attempts', description: 'Add rate limiting and account lockout logic that locks accounts for 30 minutes after 10 consecutive failed login attempts.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'api', 'security'] },
      { title: 'Configure 15-minute session idle timeout', description: 'Set session idle timeout to 15 minutes for all interfaces that access payment card data or cardholder data environment components.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'api', 'payments'] },
    ],
  },
  {
    name: 'HIPAA Updated Telehealth Guidelines',
    shortName: 'HIPAA Telehealth',
    category: 'Healthcare',
    severity: Severity.WARNING,
    region: 'US-Federal',
    affectedArea: 'Healthcare Technology',
    summary: 'HHS has finalized telehealth-specific HIPAA guidelines requiring end-to-end encryption for all video consultations, secure waiting rooms, and BAA requirements for all telehealth platform vendors.',
    fullDescription: 'The Department of Health and Human Services has issued final rules governing the use of telehealth technologies under HIPAA. All telehealth platforms must implement end-to-end encryption, provide virtual waiting room functionality, maintain audit logs of all sessions, and ensure Business Associate Agreements are in place with all technology vendors involved in the telehealth delivery chain.',
    whatChanged: 'End-to-end encryption mandatory for video and audio. Virtual waiting rooms required for patient privacy. Session recording requires explicit patient consent. All telehealth vendors must have signed BAAs. Audit logs must include session duration and participant details.',
    deadline: new Date('2024-10-01'),
    publishedAt: new Date('2024-03-20'),
    actionItems: [
      { title: 'Implement end-to-end encryption for video sessions', description: 'Ensure all telehealth video and audio streams use end-to-end encryption that prevents even the platform operator from accessing session content.', priority: Priority.HIGH, techStackRelevance: ['web', 'mobile', 'healthcare', 'webrtc'] },
      { title: 'Build secure virtual waiting room feature', description: 'Create a virtual waiting room that keeps patients in a private holding state until the provider is ready to begin the consultation.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'healthcare', 'frontend'] },
      { title: 'Verify BAA coverage for all telehealth vendors', description: 'Audit all technology vendors in the telehealth delivery chain and ensure current Business Associate Agreements are signed and on file.', priority: Priority.MEDIUM, techStackRelevance: ['healthcare', 'legal', 'operations'] },
    ],
  },
  {
    name: 'HIPAA Security Rule Amendment',
    shortName: 'HIPAA Security',
    category: 'Healthcare',
    severity: Severity.CRITICAL,
    region: 'US-Federal',
    affectedArea: 'Data Security',
    summary: 'The HIPAA Security Rule amendment requires encryption at rest for all ePHI, annual penetration testing, and mandatory security awareness training with phishing simulations for all workforce members.',
    fullDescription: 'HHS has amended the HIPAA Security Rule to address modern cybersecurity threats facing healthcare organizations. The amendment makes encryption at rest mandatory rather than addressable, requires annual third-party penetration testing, mandates phishing simulation exercises, and requires implementation of zero-trust network architecture principles for systems handling ePHI.',
    whatChanged: 'Encryption at rest now mandatory (previously addressable). Annual penetration testing by third party required. Phishing simulations must be conducted quarterly. Zero-trust architecture principles required for new systems. 24-hour breach notification to HHS for incidents affecting 500+ individuals.',
    deadline: new Date('2024-12-31'),
    publishedAt: new Date('2024-04-01'),
    actionItems: [
      { title: 'Enable encryption at rest for all ePHI databases', description: 'Configure AES-256 encryption at rest for all databases and storage systems containing electronic Protected Health Information.', priority: Priority.HIGH, techStackRelevance: ['aws', 'gcp', 'azure', 'database', 'healthcare'] },
      { title: 'Schedule annual third-party penetration test', description: 'Engage a qualified third-party security firm to conduct annual penetration testing of all systems in the ePHI environment.', priority: Priority.HIGH, techStackRelevance: ['security', 'healthcare', 'operations'] },
      { title: 'Implement quarterly phishing simulation program', description: 'Deploy a phishing simulation platform to conduct quarterly exercises and track workforce security awareness improvement over time.', priority: Priority.MEDIUM, techStackRelevance: ['security', 'operations', 'healthcare'] },
    ],
  },
  {
    name: 'ADA/WCAG 2.2 AA Compliance Deadline',
    shortName: 'WCAG 2.2 AA',
    category: 'Accessibility',
    severity: Severity.WARNING,
    region: 'US-Federal',
    affectedArea: 'Web Accessibility',
    summary: 'The DOJ final rule requires all state and local government websites to meet WCAG 2.2 Level AA by April 2026. Private sector businesses with 15+ employees serving the public should prepare for expanded enforcement.',
    fullDescription: 'The Department of Justice issued a final rule under Title II of the ADA establishing WCAG 2.2 Level AA as the technical standard for web accessibility. While initially targeting state and local governments, enforcement is expanding to Title III entities (private businesses). New WCAG 2.2 criteria include focus appearance, dragging movements alternatives, and consistent help mechanisms.',
    whatChanged: 'WCAG 2.2 Level AA is now the standard (previously 2.1). New success criteria: focus appearance (2.4.11), dragging movements (2.5.7), consistent help (3.2.6), redundant entry (3.3.7). Large entities deadline April 2026. Small entities deadline April 2027.',
    deadline: new Date('2026-04-01'),
    publishedAt: new Date('2024-04-08'),
    actionItems: [
      { title: 'Run WCAG 2.2 AA audit on all public-facing pages', description: 'Conduct a comprehensive accessibility audit using automated tools and manual testing against all new WCAG 2.2 Level AA success criteria.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'frontend', 'accessibility'] },
      { title: 'Implement focus appearance indicators (WCAG 2.4.11)', description: 'Ensure all interactive elements have a visible focus indicator that meets the new minimum area and contrast requirements in WCAG 2.2.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'frontend', 'css', 'accessibility'] },
      { title: 'Add alternatives to dragging interactions (WCAG 2.5.7)', description: 'Provide non-dragging alternatives for all drag-and-drop interactions so users who cannot perform dragging movements can still complete all tasks.', priority: Priority.LOW, techStackRelevance: ['web', 'frontend', 'accessibility'] },
      { title: 'Implement consistent help mechanism (WCAG 3.2.6)', description: 'Ensure help mechanisms like contact information, chat widgets, or FAQ links appear in a consistent location across all pages.', priority: Priority.LOW, techStackRelevance: ['web', 'frontend', 'accessibility'] },
    ],
  },
  {
    name: 'SOC 2 Type II - New Trust Service Criteria',
    shortName: 'SOC 2 TSC Update',
    category: 'Security',
    severity: Severity.INFO,
    region: 'Global',
    affectedArea: 'Compliance & Governance',
    summary: 'AICPA has updated SOC 2 Trust Service Criteria with new points of focus for cloud-native architectures, API security, and supply chain risk management. Organizations should review controls before their next audit period.',
    fullDescription: 'The American Institute of CPAs has revised the SOC 2 Trust Service Criteria to address modern technology architectures. New points of focus include container and serverless security controls, API gateway security, third-party dependency management, and software supply chain integrity. Organizations should map existing controls to the updated criteria and identify gaps before their next audit window.',
    whatChanged: 'New points of focus for container security and orchestration. API security controls explicitly addressed. Software supply chain integrity requirements added. Third-party dependency vulnerability management formalized. Incident response must address cloud-native attack vectors.',
    deadline: null,
    publishedAt: new Date('2024-03-10'),
    actionItems: [
      { title: 'Map existing controls to updated SOC 2 TSC criteria', description: 'Review the updated Trust Service Criteria and map your existing security controls to identify gaps that need to be addressed before the next audit.', priority: Priority.MEDIUM, techStackRelevance: ['security', 'operations', 'compliance'] },
      { title: 'Implement software supply chain security controls', description: 'Deploy dependency scanning, SBOM generation, and artifact signing to address new supply chain integrity requirements in the updated criteria.', priority: Priority.MEDIUM, techStackRelevance: ['web', 'api', 'security', 'devops'] },
      { title: 'Document API security controls for audit evidence', description: 'Create documentation of API authentication, authorization, rate limiting, and input validation controls for SOC 2 audit evidence collection.', priority: Priority.LOW, techStackRelevance: ['api', 'security', 'compliance'] },
    ],
  },
  {
    name: 'EU AI Act - Classification Requirements',
    shortName: 'EU AI Act',
    category: 'AI',
    severity: Severity.INFO,
    region: 'EU',
    affectedArea: 'Artificial Intelligence',
    summary: 'The EU AI Act establishes a risk-based classification system for AI systems. High-risk AI systems must undergo conformity assessments, maintain technical documentation, and implement human oversight mechanisms before deployment in the EU market.',
    fullDescription: 'The European Union AI Act creates a comprehensive regulatory framework for artificial intelligence systems. AI systems are classified into four risk tiers: unacceptable (banned), high-risk (heavily regulated), limited risk (transparency obligations), and minimal risk (no regulation). High-risk systems used in employment, credit scoring, healthcare, and law enforcement must meet strict requirements including data governance, transparency, human oversight, and robustness standards.',
    whatChanged: 'Risk classification system established with four tiers. High-risk AI systems require conformity assessments. Technical documentation and logging mandatory for high-risk systems. Human oversight mechanisms required. Transparency obligations for chatbots and deepfakes. General-purpose AI models have separate obligations.',
    deadline: new Date('2025-08-01'),
    publishedAt: new Date('2024-03-25'),
    actionItems: [
      { title: 'Classify AI systems by EU AI Act risk tier', description: 'Assess all AI and ML systems to determine their risk classification under the EU AI Act framework and identify which systems fall under high-risk requirements.', priority: Priority.MEDIUM, techStackRelevance: ['ai', 'ml', 'compliance'] },
      { title: 'Implement AI system logging and documentation', description: 'Create technical documentation and implement comprehensive logging for high-risk AI systems including training data, model decisions, and performance metrics.', priority: Priority.MEDIUM, techStackRelevance: ['ai', 'ml', 'api', 'database'] },
      { title: 'Build human oversight interface for high-risk AI decisions', description: 'Develop an interface that allows human reviewers to monitor, understand, and override AI system decisions for systems classified as high-risk.', priority: Priority.LOW, techStackRelevance: ['ai', 'ml', 'web', 'frontend'] },
    ],
  },
];

async function main() {
  console.log('Seeding database...');

  for (const reg of regulations) {
    const { actionItems, ...regulationData } = reg;

    const regulation = await prisma.regulation.create({
      data: {
        ...regulationData,
        actionItems: {
          create: actionItems,
        },
      },
    });

    console.log(`Created regulation: ${regulation.name} with ${actionItems.length} action items`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
