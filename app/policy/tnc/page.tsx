"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SiteConfig from "@/utils/SiteConfig";

export default async function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg shadow-md p-6 md:p-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="text-gray-700 font-bold">
            {SiteConfig.appName} Software Terms and Conditions
          </p>

          {/* Introduction and Acceptance of Terms */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              1. Introduction and Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong>{SiteConfig.appName}</strong> (the “
              <strong>Software</strong>&quot;), owned and operated by{" "}
              <strong>{SiteConfig.appName} Int.</strong> (“<strong>we</strong>
              ,&quot; “<strong>us</strong>,&quot; or “<strong>our</strong>
              &quot;). By creating an account, accessing, or using our{" "}
              <strong>Software</strong>, you agree to be bound by these{" "}
              <strong>Terms and Conditions</strong> (the “<strong>Terms</strong>
              &quot;) and our <strong>Privacy Policy</strong>. If you do not
              agree with any of these <strong>Terms</strong>, you must not use
              the <strong>Software</strong>.
            </p>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Purpose:</strong> The <strong>Software</strong> is
                designed to provide human resources (HR) management tools,
                including employee record-keeping, performance management,
                payroll integration, and other related functionalities.
              </li>
              <li>
                <strong>Updates to the Terms:</strong> We may revise or update
                these <strong>Terms</strong> from time to time. Any significant
                changes will be notified via email or a prominent notice within
                the <strong>Software</strong>. Your continued use of the{" "}
                <strong>Software</strong> after such changes constitutes
                acceptance of the revised <strong>Terms</strong>.
              </li>
              <li>
                <strong>Additional Agreements:</strong> In some cases, specific
                modules or features may be subject to additional or separate
                agreements, which will supplement or override these{" "}
                <strong>Terms</strong> where explicitly stated.
              </li>
            </ul>
          </section>

          {/* Definitions */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">2. Definitions</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>“Client&quot; or “You&quot;:</strong> The individual,
                company, or organization that registers for and/or uses the{" "}
                <strong>{SiteConfig.appName} Software</strong>.
              </li>
              <li>
                <strong>“Users&quot;:</strong> Employees, contractors,
                administrators, or other personnel authorized by the{" "}
                <strong>Client</strong> to access the <strong>Software</strong>.
              </li>
              <li>
                <strong>“Content&quot;:</strong> Any text, images, data, and
                other materials uploaded, posted, or transmitted through the{" "}
                <strong>Software</strong>.
              </li>
            </ul>
          </section>

          {/* Account Registration and Eligibility */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              3. Account Registration and Eligibility
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Account Creation:</strong> To use the{" "}
                <strong>Software</strong>, you may be required to create an
                account. You agree to provide true, accurate, and current
                information during registration and to keep this information
                updated.
              </li>
              <li>
                <strong>Access Credentials:</strong> You are responsible for
                maintaining the confidentiality of your login credentials. Any
                activity under your account is deemed to be performed by you.
                Notify us immediately if you suspect any unauthorized access or
                use of your account.
              </li>
              <li>
                <strong>Eligibility:</strong> You represent that you (and your{" "}
                <strong>Users</strong>) are at least 16 years of age or the age
                of majority in your jurisdiction, and have the legal capacity to
                enter into this agreement.
              </li>
            </ul>
          </section>

          {/* License and User Obligations */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              4. License and User Obligations
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>License Grant:</strong> Subject to these{" "}
                <strong>Terms</strong> and your payment of any applicable fees,
                we grant you a non-exclusive, non-transferable, revocable
                license to access and use the <strong>Software</strong> solely
                for your internal business operations.
              </li>
              <li>
                <strong>Restrictions:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    You shall not sell, lease, license, or otherwise transfer
                    the <strong>Software</strong> or any content within it to a
                    third party without our explicit written consent.
                  </li>
                  <li>
                    You shall not reverse engineer, decompile, or disassemble
                    any part of the <strong>Software</strong>, except to the
                    extent permitted by applicable law.
                  </li>
                  <li>
                    You shall not use the <strong>Software</strong> to post or
                    transmit unlawful, defamatory, or infringing materials.
                  </li>
                  <li>
                    You shall not use the <strong>Software</strong> in any
                    manner that could damage, disable, or overburden our servers
                    or networks.
                  </li>
                </ul>
              </li>
              <li>
                <strong>User Responsibilities:</strong>
                <ul className="list-disc ml-6">
                  <li>
                    <strong>Compliance with Laws:</strong> You agree to comply
                    with all applicable laws, including data protection and
                    employment laws relevant to your use of the{" "}
                    <strong>Software</strong> (e.g., <strong>GDPR</strong>,{" "}
                    <strong>Data Protection Act 2018</strong>).
                  </li>
                  <li>
                    <strong>Accuracy of Data:</strong> You are responsible for
                    ensuring the accuracy, completeness, and legality of all
                    data entered into the <strong>Software</strong>.
                  </li>
                  <li>
                    <strong>Permissions:</strong> You must obtain all necessary
                    consents from your employees or other data subjects before
                    inputting their personal data into the{" "}
                    <strong>Software</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Fees and Payment */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">5. Fees and Payment</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Subscription Fees:</strong> If your use of the{" "}
                <strong>Software</strong> is subject to subscription or
                licensing fees, the amount, payment schedule, and related
                details are specified in your order form, invoice, or
                subscription plan.
              </li>
              <li>
                <strong>Payment Terms:</strong> Payments must be made in the
                currency and manner specified. Overdue amounts may incur
                interest or additional charges as stated in your subscription
                agreement.
              </li>
              <li>
                <strong>Refunds:</strong> Unless otherwise specified in a
                separate agreement or required by law, all fees paid are
                non-refundable.
              </li>
            </ul>
          </section>

          {/* Intellectual Property Rights */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              6. Intellectual Property Rights
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Ownership:</strong>{" "}
                <strong>{SiteConfig.appName}</strong> and/or its licensors
                retain all rights, title, and interest in the{" "}
                <strong>Software</strong>, including but not limited to any
                updates, enhancements, and related documentation. These{" "}
                <strong>Terms</strong> do not grant you ownership of any
                intellectual property rights in the <strong>Software</strong>.
              </li>
              <li>
                <strong>Client Content:</strong> You retain all rights to the
                data and content you upload into the <strong>Software</strong>.
                By uploading <strong>Content</strong>, you grant us a worldwide,
                non-exclusive license to process and store such{" "}
                <strong>Content</strong> solely for the purpose of providing the{" "}
                <strong>Software</strong>’s functionalities.
              </li>
              <li>
                <strong>Trademarks:</strong> All trademarks, service marks, and
                trade names associated with{" "}
                <strong>{SiteConfig.appName}</strong> are owned by us or our
                licensors. You must not use these marks without our prior
                written consent.
              </li>
            </ul>
          </section>

          {/* Confidentiality */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">7. Confidentiality</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Definition of Confidential Information:</strong> “
                <strong>Confidential Information</strong>&quot; includes all
                non-public information disclosed by one party to the other,
                whether verbally or in writing, that is designated confidential
                or should be reasonably understood as confidential (e.g.,
                business data, employee records, proprietary software code).
              </li>
              <li>
                <strong>Obligations:</strong> Each party agrees:
                <ul className="list-disc ml-6">
                  <li>
                    To maintain the other party’s{" "}
                    <strong>Confidential Information</strong> in strict
                    confidence.
                  </li>
                  <li>
                    To use it solely for the purpose of fulfilling obligations
                    under these <strong>Terms</strong>.
                  </li>
                  <li>
                    Not to disclose it to third parties without the prior
                    written consent of the disclosing party, except as required
                    by law or court order.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Data Protection and Security */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              8. Data Protection and Security
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Privacy Policy:</strong> Our collection, processing, and
                storage of personal data is governed by our [Privacy Policy
                Link] and our [GDPR Policy Link], which form part of these{" "}
                <strong>Terms</strong>.
              </li>
              <li>
                <strong>Security Measures:</strong> We implement appropriate
                technical and organizational measures to protect personal data
                from unauthorized access or disclosure. However, no security
                system is foolproof, and we do not guarantee absolute security.
              </li>
              <li>
                <strong>Data Breaches:</strong> We have procedures in place to
                detect and manage data breaches. In the event of a personal data
                breach, we will notify you and/or relevant authorities in
                compliance with applicable data protection laws.
              </li>
            </ul>
          </section>

          {/* Third-Party Integrations and Links */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              9. Third-Party Integrations and Links
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Third-Party Services:</strong> The{" "}
                <strong>Software</strong> may integrate or link to third-party
                services (e.g., payroll processors, background check services).
                Your use of any third-party service is subject to that service’s
                own terms and conditions.
              </li>
              <li>
                <strong>No Endorsement:</strong> We do not endorse or assume
                responsibility for any third-party services. You access such
                services at your own risk.
              </li>
            </ul>
          </section>

          {/* Warranties and Disclaimers */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              10. Warranties and Disclaimers
            </h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Limited Warranty:</strong> We warrant that the{" "}
                <strong>Software</strong> will perform materially in accordance
                with its documentation under normal use. This limited warranty
                does not cover issues caused by misuse, unauthorized
                modifications, or external factors beyond our control.
              </li>
              <li>
                <strong>Disclaimer of Other Warranties:</strong> Except for the
                above limited warranty, the <strong>Software</strong> is
                provided on an “as is&quot; and “as available&quot; basis. To
                the fullest extent permitted by law, we disclaim all other
                warranties, whether express, implied, or statutory, including
                but not limited to implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </li>
              <li>
                <strong>No Guarantee of Error-Free Operation:</strong> We do not
                guarantee that the <strong>Software</strong> will be
                uninterrupted or error-free, or that all defects will be
                corrected.
              </li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">11. Limitation of Liability</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Exclusion of Certain Damages:</strong> To the extent
                permitted by law, neither party shall be liable for any
                indirect, consequential, special, or incidental damages
                (including loss of profits, revenue, data, or goodwill) arising
                out of or related to these <strong>Terms</strong> or use of the{" "}
                <strong>Software</strong>, even if advised of the possibility of
                such damages.
              </li>
              <li>
                <strong>Liability Cap:</strong> In no event shall our total
                aggregate liability exceed the total amount paid by you for the{" "}
                <strong>Software</strong> in the twelve (06) months preceding
                the event giving rise to the claim, or one thousand pounds
                (£500), whichever is greater.
              </li>
              <li>
                <strong>Exceptions:</strong> Nothing in these{" "}
                <strong>Terms</strong> excludes or limits liability for death or
                personal injury caused by negligence, fraud, fraudulent
                misrepresentation, or any other liability that cannot be
                excluded by law.
              </li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">12. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless{" "}
              <strong>{SiteConfig.appName}</strong>, its affiliates, and their
              respective officers, directors, employees, and agents from any
              claims, liabilities, damages, losses, or expenses (including legal
              fees) arising out of or related to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>
                Your use of the <strong>Software</strong> in violation of these{" "}
                <strong>Terms</strong>.
              </li>
              <li>
                Any <strong>Content</strong> you upload that infringes or
                violates a third party’s rights.
              </li>
              <li>Your breach of applicable laws or regulations.</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">13. Termination</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Termination by You:</strong> You may cease using the{" "}
                <strong>Software</strong> at any time. If you have a
                subscription, you must provide notice in accordance with your
                subscription agreement or plan.
              </li>
              <li>
                <strong>Termination by Us:</strong> We reserve the right to
                suspend or terminate your account or access to the{" "}
                <strong>Software</strong> if:
                <ul className="list-disc ml-6">
                  <li>
                    You breach these <strong>Terms</strong> and fail to remedy
                    the breach within a reasonable time.
                  </li>
                  <li>
                    Required by law or at the request of governmental
                    authorities.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Effect of Termination:</strong> Upon termination, your
                right to use the <strong>Software</strong> immediately ceases.
                We may retain certain data if necessary to comply with legal
                obligations or for legitimate business purposes, subject to our{" "}
                <strong>Privacy Policy</strong> and data protection laws.
              </li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">14. Dispute Resolution</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Governing Law:</strong> These <strong>Terms</strong> and
                any disputes arising hereunder shall be governed by and
                construed in accordance with the laws of{" "}
                <strong>England and Wales</strong>, without regard to
                conflict-of-law principles.
              </li>
              <li>
                <strong>Jurisdiction:</strong> The courts located in{" "}
                <strong>England and Wales</strong> shall have exclusive
                jurisdiction to resolve any disputes arising out of or in
                connection with these <strong>Terms</strong>.
              </li>
              <li>
                <strong>Informal Resolution:</strong> Before resorting to formal
                legal action, both parties agree to attempt to resolve disputes
                through good-faith negotiations.
              </li>
            </ul>
          </section>

          {/* Changes to the Software */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">15. Changes to the Software</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, update, or discontinue the{" "}
              <strong>Software</strong> or any part thereof at any time. We will
              strive to provide adequate notice if such changes materially
              affect your usage.
            </p>
          </section>

          {/* General Provisions */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">16. General Provisions</h2>
            <ul className="list-decimal ml-6 text-gray-700">
              <li>
                <strong>Entire Agreement:</strong> These <strong>Terms</strong>,
                together with any additional agreements or policies referenced
                herein, constitute the entire agreement between you and us
                regarding the <strong>Software</strong>.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these{" "}
                <strong>Terms</strong> is held invalid or unenforceable, the
                remaining provisions will remain in full force and effect.
              </li>
              <li>
                <strong>No Waiver:</strong> Our failure to enforce any right or
                provision of these <strong>Terms</strong> does not constitute a
                waiver of such right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign your rights or
                delegate your obligations under these <strong>Terms</strong>{" "}
                without our prior written consent. We may assign or transfer our
                rights under these <strong>Terms</strong> in connection with a
                merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>Notices:</strong> Any notices or communications required
                or permitted under these <strong>Terms</strong> shall be in
                writing and delivered via email or other reliable means to the
                addresses provided by the parties.
              </li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">17. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these <strong>Terms</strong> or any issues
              regarding the <strong>{SiteConfig.appName} Software</strong>,
              please contact us at:
            </p>
            <p className="mt-2 text-gray-700">
              <strong>{SiteConfig.appName}</strong>
              <br />
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:info@${SiteConfig.appName}.com`}
                className="text-blue-600 hover:underline"
              >
                info@{SiteConfig.appName}.com
              </a>
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Updated:</strong> Date
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
