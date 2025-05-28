"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SiteConfig from "@/utils/SiteConfig";

export default async function GDPRPolicyPage() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg shadow-md p-6 md:p-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">GDPR Policy</h1>
          <p className="text-gray-700 font-bold">
            {SiteConfig.appName} GDPR Policy
          </p>

          {/* Introduction */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              {SiteConfig.appName} (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to safeguarding the personal data
              entrusted to us by our clients, employees, contractors, and any
              other individuals whose personal data we handle. This{" "}
              <strong>GDPR Policy</strong> outlines how we collect, process,
              store, and protect personal data, ensuring compliance with:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                The{" "}
                <strong>UK General Data Protection Regulation (UK GDPR)</strong>
              </li>
              <li>
                The <strong>Data Protection Act 2018</strong>
              </li>
              <li>Other applicable data protection laws and regulations</li>
            </ul>
            <p className="mt-2 text-gray-700 leading-relaxed">
              This policy is based on best practices and aligns with industry
              standards. It is intended to provide clear guidelines to all
              stakeholders regarding their rights and obligations under the{" "}
              <strong>GDPR</strong>.
            </p>
          </section>

          {/* Scope and Purpose */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">2. Scope and Purpose</h2>
            <h3 className="text-lg font-medium mb-2">2.1 Scope</h3>
            <p className="text-gray-700 leading-relaxed">
              This policy applies to all processing activities involving
              personal data carried out by {SiteConfig.appName}, including those
              performed by employees, contractors, and third-party service
              providers acting on our behalf.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Purpose</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                To <strong>comply</strong> with obligations under the UK GDPR
                and other applicable data protection laws.
              </li>
              <li>
                To <strong>implement</strong> appropriate technical and
                organisational measures to protect personal data.
              </li>
              <li>
                To <strong>provide</strong> guidance on how we collect, use,
                store, share, and delete personal data.
              </li>
              <li>
                To <strong>inform</strong> data subjects (employees, clients,
                users) of their rights and how to exercise them.
              </li>
            </ul>
          </section>

          {/* Roles and Responsibilities */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              3. Roles and Responsibilities
            </h2>
            <h3 className="text-lg font-medium mb-2">
              3.1 Data Controller vs. Data Processor
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Data Controller:</strong> {SiteConfig.appName} acts as a{" "}
              <strong>Data Controller</strong> when determining the purposes and
              means of processing personal data for our own business operations
              (e.g., user account data for customer support or billing).
              <br />
              <strong>Data Processor:</strong> {SiteConfig.appName} acts as a{" "}
              <strong>Data Processor</strong> when our clients (employers using
              the {SiteConfig.appName} platform) determine the purposes and
              means of processing personal data (e.g., employee data in the
              platform).
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">
              3.2 Data Protection Officer (DPO) or Responsible Person
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We oversee our data protection strategy and compliance efforts
              regularly. For any questions or concerns about this Policy or our
              data handling practices, please contact:{" "}
              <a
                href={`mailto:info@${SiteConfig.appName}.com`}
                className="text-blue-600 hover:underline"
              >
                info@${SiteConfig.appName}.com
              </a>
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">
              3.3 All Employees and Contractors
            </h3>
            <p className="text-gray-700 leading-relaxed">
              All individuals working for or on behalf of {SiteConfig.appName}{" "}
              are responsible for following this Policy and related procedures.
              They must complete data protection training and understand their
              obligations under the <strong>GDPR</strong>.
            </p>
          </section>

          {/* Lawful Basis for Processing */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              4. Lawful Basis for Processing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {SiteConfig.appName} processes personal data lawfully, fairly, and
              in a transparent manner. We rely on one or more of the following
              lawful bases under the <strong>UK GDPR</strong>:
            </p>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Consent:</strong> Where data subjects have explicitly
                provided consent for specific purposes (e.g., marketing
                communications).
              </li>
              <li>
                <strong>Contractual Necessity:</strong> Where processing is
                necessary for the performance of a contract (e.g., providing HR
                management services to our clients).
              </li>
              <li>
                <strong>Legal Obligation:</strong> Where processing is necessary
                to comply with a legal requirement (e.g., responding to lawful
                requests from public authorities).
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Where processing is
                necessary for legitimate interests pursued by{" "}
                {SiteConfig.appName} or a third party, provided these interests
                are not overridden by the rights and freedoms of the data
                subject (e.g., fraud prevention, improving software
                functionality).
              </li>
            </ul>
          </section>

          {/* Personal Data We Collect */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              5. Personal Data We Collect
            </h2>
            <h3 className="text-lg font-medium mb-2">
              5.1 Client and User Data
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                <strong>Account Registration:</strong> Names, email addresses,
                phone numbers, login credentials, and identifiers.
              </li>
              <li>
                <strong>Business Contact Details:</strong> Job title, company
                name, and professional contact information.
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              5.2 Employee Data (When Acting as a Data Processor)
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Employment details: job title, salary, performance data, and
                related HR information.
              </li>
              <li>
                Personal identifiers: name, contact information, national
                insurance number (or equivalent).
              </li>
              <li>
                Other data required for HR management (e.g., right-to-work
                documentation).
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              5.3 Technical Data
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                IP addresses, device identifiers, browser type, usage logs
                (collected automatically when users interact with our software).
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">5.4 Other Data</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Additional personal data provided through communications,
                support requests, or integrations (e.g., background checks,
                payroll systems).
              </li>
            </ul>
          </section>

          {/* Data Collection and Processing Principles */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              6. Data Collection and Processing Principles
            </h2>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Purpose Limitation:</strong> We collect and process
                personal data only for specified, explicit, and legitimate
                purposes and do not use it in ways incompatible with those
                purposes.
              </li>
              <li>
                <strong>Data Minimisation:</strong> We ensure data is adequate,
                relevant, and limited to what is necessary in relation to the
                purposes for which it is processed.
              </li>
              <li>
                <strong>Accuracy:</strong> We take reasonable steps to ensure
                personal data is accurate, kept up to date, and rectified when
                inaccuracies are identified.
              </li>
              <li>
                <strong>Transparency:</strong> We provide clear and concise
                information about our processing activities via this policy and
                any supplemental notices.
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">7. Data Retention</h2>
            <h3 className="text-lg font-medium mb-2">7.1 Retention Period</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Personal data is retained only for as long as necessary to
                fulfil the purposes for which it was collected or to comply with
                legal and contractual obligations.
              </li>
              <li>
                Where {SiteConfig.appName} acts as a{" "}
                <strong>Data Processor</strong>, retention periods may be
                determined by the client (<strong>Data Controller</strong>).
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              7.2 Deletion or Anonymisation
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Once personal data is no longer needed, we securely delete or
                anonymise it unless a longer retention period is required or
                permitted by law (e.g., tax regulations, legal claims).
              </li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              8. Data Sharing and Disclosure
            </h2>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Service Providers:</strong> We engage trusted third
                parties (e.g., cloud hosting, analytics, email delivery) that
                process personal data on our behalf under written{" "}
                <strong>Data Processing Agreements</strong>. These providers
                must follow strict data protection requirements.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or asset sale, personal data may be transferred to
                the acquiring entity. We will provide notice of any significant
                change in data handling or ownership.
              </li>
              <li>
                <strong>Legal Compliance:</strong> We may disclose personal data
                when required by law or to protect our rights, property, or
                safety, or to comply with lawful requests by public authorities.
              </li>
            </ul>
          </section>

          {/* International Data Transfers */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              9. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Where personal data is transferred outside the UK, we implement
              appropriate safeguards, such as:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                <strong>Standard Contractual Clauses (SCCs)</strong> or the{" "}
                <strong>UK International Data Transfer Agreement (IDTA)</strong>
              </li>
              <li>
                <strong>Adequacy decisions</strong> where the destination
                country is deemed to provide an adequate level of protection
              </li>
              <li>
                <strong>Binding Corporate Rules (BCRs)</strong> for certain
                internal group data transfers
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              These measures ensure personal data receives a level of protection
              consistent with <strong>UK GDPR</strong> requirements.
            </p>
          </section>

          {/* Security Measures */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">10. Security Measures</h2>
            <p className="text-gray-700 leading-relaxed">
              {SiteConfig.appName} employs technical and organisational measures
              to protect personal data against unauthorised access, accidental
              loss, or destruction, including:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                <strong>Encryption</strong> of data in transit (SSL/TLS) and,
                where feasible, at rest
              </li>
              <li>
                <strong>Access controls</strong> and role-based permissions,
                ensuring only authorised personnel can access sensitive data
              </li>
              <li>
                <strong>Regular security assessments</strong> such as
                penetration testing and system monitoring
              </li>
              <li>
                <strong>
                  Up-to-date firewalls, antivirus, and intrusion detection
                </strong>{" "}
                systems
              </li>
              <li>
                <strong>Staff training</strong> and clear internal policies on
                data handling
              </li>
            </ul>
          </section>

          {/* Data Subject Rights */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">11. Data Subject Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Under the <strong>GDPR</strong>, data subjects have the following
              rights:
            </p>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Right of Access:</strong> Obtain confirmation of whether
                and how we process their personal data, and request a copy of
                it.
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to Erasure (Right to be Forgotten):</strong>{" "}
                Request deletion of personal data in certain circumstances
                (e.g., no longer necessary for the collected purpose).
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request limited
                use of personal data under specific conditions (e.g., contesting
                accuracy).
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive personal
                data in a structured, commonly used, and machine-readable
                format, and request its transfer to another controller.
              </li>
              <li>
                <strong>Right to Object:</strong> Object to the processing of
                personal data, including for direct marketing or when based on
                legitimate interests.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw previously
                given consent at any time without affecting the lawfulness of
                processing prior to withdrawal.
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> Lodge a complaint
                with the UK{" "}
                <strong>Information Commissioner’s Office (ICO)</strong> or
                another competent data protection authority.
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              Exercising Your Rights
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Where {SiteConfig.appName} acts as{" "}
                <strong>Data Controller</strong>, please contact us at{" "}
                <a
                  href={`mailto:info@${SiteConfig.appName}.com`}
                  className="text-blue-600 hover:underline"
                >
                  info@${SiteConfig.appName}.com
                </a>
                .
              </li>
              <li>
                Where {SiteConfig.appName} acts as a{" "}
                <strong>Data Processor</strong>, data subjects should direct
                their requests to the <strong>Data Controller</strong> (the
                employer/client).
              </li>
            </ul>
          </section>

          {/* Training and Awareness */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              12. Training and Awareness
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All {SiteConfig.appName} employees and contractors handling
              personal data receive regular training on:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>GDPR principles and obligations</li>
              <li>Internal policies and procedures</li>
              <li>Best practices for safeguarding personal data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This training ensures everyone understands their responsibilities
              and follows appropriate data handling procedures.
            </p>
          </section>

          {/* Breach Notification */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">13. Breach Notification</h2>
            <h3 className="text-lg font-medium mb-2">
              13.1 Reporting Data Breaches
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                In the event of a personal data breach (accidental or unlawful
                destruction, loss, alteration, unauthorised disclosure of, or
                access to personal data), {SiteConfig.appName} will promptly
                assess the risk to individuals’ rights and freedoms.
              </li>
              <li>
                If a breach is notifiable, we will inform the{" "}
                <strong>ICO</strong> without undue delay and, where feasible,{" "}
                <strong>within 72 hours</strong> of becoming aware of the
                breach.
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              13.2 Notifying Data Subjects
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Where the breach is likely to result in a high risk to the
                rights and freedoms of individuals, we will also communicate the
                breach to the affected data subjects without undue delay.
              </li>
            </ul>
          </section>

          {/* Third-Party Relationships */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              14. Third-Party Relationships
            </h2>
            <h3 className="text-lg font-medium mb-2">14.1 Due Diligence</h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                Before engaging a third party to process personal data on our
                behalf, we conduct appropriate due diligence to ensure they
                maintain suitable data protection and security standards.
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-4 mb-2">
              14.2 Data Processing Agreements (DPAs)
            </h3>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                We enter into written agreements with third-party processors
                that include <strong>GDPR</strong>-compliant clauses, ensuring
                personal data is processed solely per our instructions and
                protected by sufficient security measures.
              </li>
            </ul>
          </section>

          {/* Review and Updates */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">15. Review and Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We periodically review this <strong>GDPR Policy</strong> to
              reflect changes in:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Technology and security practices</li>
              <li>Legal requirements and regulations</li>
              <li>Operational processes or data handling activities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Any significant updates will be communicated via email or a
              prominent notice on our website or platform, and the
              &quot;Effective Date&quot; will be revised accordingly.
            </p>
          </section>

          {/* Contact Us */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">16. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions, concerns, or requests about this{" "}
              <strong>GDPR Policy</strong> or our data protection practices,
              please contact:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>{SiteConfig.appName}</strong>
              <br />
              Email:{" "}
              <a
                href={`mailto:info@${SiteConfig.appName}.com`}
                className="text-blue-600 hover:underline"
              >
                info@${SiteConfig.appName}.com
              </a>
            </p>
            <p className="mt-2 text-gray-700">
              You also have the right to lodge a complaint with the{" "}
              <strong>Information Commissioner’s Office (ICO)</strong> if you
              believe your data protection rights have been infringed. For more
              information, visit{" "}
              <a
                href="https://ico.org.uk"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>
              .
            </p>
          </section>

          {/* Back to Home Button */}
          <div className="mt-8">
            <Link href="/" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
