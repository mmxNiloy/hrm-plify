"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg shadow-md p-6 md:p-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-700 font-bold">
            Revolo HR Privacy Policy V1.1.1
          </p>
          <p className="text-gray-700 italic">Effective Date: _____</p>

          {/* Introduction */}
          <section className="flex flex-col gap-2">
            <p className="text-gray-700 leading-relaxed">
              <strong>Revolo HR</strong> (“<strong>we</strong>,&quot; “
              <strong>us</strong>,&quot; or “<strong>our</strong>&quot;) is
              committed to respecting and protecting your privacy. This{" "}
              <strong>Privacy Policy</strong> explains how we collect, use,
              store, and share personal data when you use the{" "}
              <strong>Revolo HR</strong> (“<strong>Software</strong>&quot; or “
              <strong>Service</strong>&quot;) and outlines your rights under the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong> and
              other applicable data protection laws. By accessing or using the{" "}
              <strong>Software</strong>, you agree to the terms of this{" "}
              <strong>Privacy Policy</strong>.
            </p>
          </section>

          {/* Who We Are */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">1. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Revolo HR</strong> is a human resources (HR) management
              platform that enables organizations to handle employee data,
              manage HR tasks, and streamline workforce processes. We act as a{" "}
              <strong>data processor</strong> on behalf of our clients (the
              employers who use our <strong>Service</strong> to manage their
              workforce) and may also act as a <strong>data controller</strong>{" "}
              for certain types of data (e.g., user account data or data we
              collect for our own business purposes).
            </p>
            <p className="text-gray-700 leading-relaxed">
              For any questions or concerns about this{" "}
              <strong>Privacy Policy</strong> or our data practices, please
              contact us at:
              <br />
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@revolohr.com"
                className="text-blue-600 hover:underline"
              >
                info@revolohr.com
              </a>
            </p>
          </section>

          {/* Scope and Definitions */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">2. Scope and Definitions</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                <strong>Personal Data:</strong> Any information relating to an
                identified or identifiable natural person.
              </li>
              <li>
                <strong>Processing:</strong> Any operation performed on personal
                data, whether by automated means or not (e.g., collection,
                storage, use, disclosure, etc.).
              </li>
              <li>
                <strong>Data Controller:</strong> The entity that determines the
                purposes and means of processing personal data.
              </li>
              <li>
                <strong>Data Processor:</strong> The entity that processes
                personal data on behalf of the data controller.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Where <strong>Revolo HR</strong> provides the{" "}
              <strong>Software</strong> to an organization (the “
              <strong>Client</strong>&quot;), the <strong>Client</strong> is the{" "}
              <strong>data controller</strong> with respect to employee and HR
              data in the system, and we act as a{" "}
              <strong>data processor</strong>. In some instances, however, we
              may act as a <strong>data controller</strong> for specific data
              (e.g., user account data used for delivering customer support,
              billing, etc.).
            </p>
          </section>

          {/* Personal Data We Collect */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">3. Personal Data We Collect</h2>
            <h3 className="text-lg font-bold">3.1 Data Provided by You</h3>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Account Registration Data:</strong> When you create or
                access an account in the <strong>Software</strong>, we may
                collect personal information such as your name, email address,
                phone number, password, and other identifiers.
              </li>
              <li>
                <strong>Profile and Employment Data:</strong> If you are an
                employee or contractor using the <strong>Software</strong>, we
                may collect details such as job title, employment status, salary
                or pay rate, work history, performance data, and other
                HR-related information your employer provides.
              </li>
              <li>
                <strong>Contact and Communication Data:</strong> If you contact
                us directly (e.g., for support or inquiries), we may collect any
                personal data you provide within those communications.
              </li>
            </ul>
            <h3 className="text-lg font-bold mt-4">
              3.2 Data Collected Automatically
            </h3>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Device and Usage Information:</strong> We may collect
                information about the device you use to access the{" "}
                <strong>Software</strong> (e.g., operating system, device ID,
                browser type, IP address) and usage patterns (e.g., pages
                visited, features used, timestamps).
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We may use
                cookies, web beacons, and other tracking technologies to enhance
                user experience, analyse performance, and personalize content.
                For more details, refer to our [Cookie Policy] ([Link]).
              </li>
            </ul>
            <h3 className="text-lg font-bold mt-4">
              3.3 Data from Third Parties
            </h3>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Employer and Authorized Administrators:</strong> We may
                receive personal data from your employer or authorized
                administrators who input data into the <strong>Software</strong>
                , such as HR managers or team leads.
              </li>
              <li>
                <strong>Service Providers:</strong> In certain cases, we may
                receive information from third-party service providers (e.g.,
                background check providers, payroll services) if they are
                integrated with or used by your employer through the{" "}
                <strong>Software</strong>.
              </li>
            </ul>
          </section>

          {/* How We Use Your Personal Data */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              4. How We Use Your Personal Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We process personal data for the following purposes and under the
              lawful bases permitted by <strong>GDPR</strong> and other
              applicable data protection laws:
            </p>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Providing the Service:</strong>
                <ul className="list-disc ml-6">
                  <li>To set up and maintain your user account.</li>
                  <li>
                    To store and manage HR data on behalf of the{" "}
                    <strong>Client</strong>.
                  </li>
                </ul>
                <strong>Lawful Basis:</strong> Performance of a contract;
                legitimate interests.
              </li>
              <li>
                <strong>Software Functionality and Support:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    To ensure the <strong>Software</strong> is functioning
                    properly and to provide technical support.
                  </li>
                  <li>
                    To respond to inquiries, feedback, and troubleshooting
                    requests.
                  </li>
                </ul>
                <strong>Lawful Basis:</strong> Performance of a contract;
                legitimate interests.
              </li>
              <li>
                <strong>Service Improvements and Analytics:</strong>
                <ul className="list-disc ml-6">
                  <li>To monitor and analyse usage trends and preferences.</li>
                  <li>
                    To improve and personalize the features of our{" "}
                    <strong>Software</strong>.
                  </li>
                </ul>
                <strong>Lawful Basis:</strong> Legitimate interests (e.g., to
                improve our services).
              </li>
              <li>
                <strong>Communication:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    To send you important notifications regarding updates,
                    changes to policies, or service-related notices.
                  </li>
                  <li>To provide promotional messages if you have opted in.</li>
                </ul>
                <strong>Lawful Basis:</strong> Legitimate interests; consent
                (for marketing communications, where required).
              </li>
              <li>
                <strong>Compliance and Legal Obligations:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    To comply with applicable laws, regulations, or legal
                    processes.
                  </li>
                  <li>
                    To enforce our <strong>Terms of Service</strong> or protect
                    our rights, property, or safety.
                  </li>
                </ul>
                <strong>Lawful Basis:</strong> Legal obligation; legitimate
                interests.
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">5. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain personal data for as long as necessary to fulfil the
              purposes outlined in this <strong>Privacy Policy</strong> or as
              required by law. Specific retention periods may vary depending on
              contractual obligations, legal requirements, or ongoing business
              needs. Where we act as a <strong>data processor</strong>, we will
              retain personal data according to the instructions of the{" "}
              <strong>data controller</strong> (the <strong>Client</strong>) and
              will delete or return such data upon request or at the termination
              of our agreement, unless applicable law requires otherwise.
            </p>
          </section>

          {/* How We Share Your Personal Data */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              6. How We Share Your Personal Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or rent personal data to third parties. We may
              share data in the following circumstances:
            </p>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>With the Client (Your Employer):</strong> Since the{" "}
                <strong>Software</strong> is provided to an organization, the HR
                data belongs to that organization. We share your personal data
                with authorized personnel and administrators in your
                organization as needed for HR purposes.
              </li>
              <li>
                <strong>Service Providers and Vendors:</strong> We engage
                trusted third-party service providers to perform functions and
                provide services to us (e.g., cloud hosting, email delivery,
                customer support software). These providers process personal
                data only on our instructions and in compliance with this{" "}
                <strong>Privacy Policy</strong> and applicable data protection
                laws.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or asset sale, personal data may be transferred to
                a third party. We will notify you if your data becomes subject
                to a different privacy policy.
              </li>
              <li>
                <strong>Legal Obligations and Protections:</strong> We may
                disclose personal data if required to do so by law or if we
                believe in good faith that such action is necessary to comply
                with legal processes, enforce our agreements, or protect the
                rights, property, or safety of <strong>Revolo HR</strong>, our
                users, or others.
              </li>
            </ul>
          </section>

          {/* International Data Transfers */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              7. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your personal data may be transferred to and processed in
              countries other than the country in which you are resident. Such
              countries may have data protection laws that are different from
              those in your country. Where personal data is transferred outside
              of the UK or <strong>European Economic Area (EEA)</strong>, we
              ensure that we have appropriate safeguards in place, such as{" "}
              <strong>Standard Contractual Clauses</strong>, to protect your
              data in accordance with <strong>GDPR</strong> requirements.
            </p>
          </section>

          {/* Security Measures */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">8. Security Measures</h2>
            <p className="text-gray-700 leading-relaxed">
              We take reasonable technical and organizational measures to
              protect personal data from unauthorized access, alteration,
              disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                Encryption of data in transit (e.g., using{" "}
                <strong>SSL/TLS</strong>) and at rest where feasible.
              </li>
              <li>Secure server infrastructures and firewalls.</li>
              <li>Strict access controls and authentication methods.</li>
              <li>Regular security assessments and staff training.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Despite our efforts, no security measure is perfect, and we cannot
              guarantee absolute security of your data.
            </p>
          </section>

          {/* Your Rights Under GDPR and Other Data Protection Laws */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              9. Your Rights Under GDPR and Other Data Protection Laws
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your location and applicable law, you may have the
              following rights regarding your personal data:
            </p>
            <ul className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                <strong>Right of Access:</strong> You can request a copy of the
                personal data we hold about you.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You can ask us to
                correct any inaccurate or incomplete personal data.
              </li>
              <li>
                <strong>
                  Right to Erasure (“Right to be Forgotten&quot;):
                </strong>{" "}
                You can request that we delete your personal data under certain
                circumstances.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You can request
                that we limit the processing of your data in certain cases.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You can request a
                copy of your data in a structured, commonly used, and
                machine-readable format.
              </li>
              <li>
                <strong>Right to Object:</strong> You can object to the
                processing of your data under certain circumstances, including
                the use of personal data for direct marketing.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Where we rely on
                your consent, you can withdraw your consent at any time without
                affecting the lawfulness of processing based on consent before
                its withdrawal.
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> You can lodge a
                complaint with your local data protection authority if you
                believe our data processing violates your rights.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise your rights, please contact us at [Insert Contact
              Email]. Where we process your data on behalf of your employer (the{" "}
              <strong>data controller</strong>), we may direct you to them for
              certain requests.
            </p>
          </section>

          {/* Children’s Privacy */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">10. Children’s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              The <strong>Software</strong> is not directed to or intended for
              use by children under the age of 16 (or the applicable age of
              digital consent in your jurisdiction). We do not knowingly collect
              personal data from children. If you believe that a child has
              provided us with personal data without parental or guardian
              consent, please contact us at [Insert Contact Email], and we will
              take steps to delete such information.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this <strong>Privacy Policy</strong> from time to
              time to reflect changes in our practices, technologies, legal
              requirements, or other factors. When we do, we will revise the “
              <strong>Effective Date</strong>&quot; at the top of the document.
              In the event of significant changes, we will notify you via email
              or prominent notice within the <strong>Software</strong>.
            </p>
          </section>

          {/* Contact Us */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this{" "}
              <strong>Privacy Policy</strong> or our data handling practices,
              please contact us at:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@revolohr.com"
                className="text-blue-600 hover:underline"
              >
                info@revolohr.com
              </a>
            </p>
          </section>

          {/* Back to Home Button */}
          <div className="mt-8">
            <Link href="/" passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
