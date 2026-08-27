import HeroSub from '@/components/shared/HeroSub'
import { FloatingBubbles } from '@/components/Home/FloatingBubbles'

export const metadata = {
  title: 'Terms & Conditions | Blue Key Realty',
  description: 'Terms & Conditions for Blue Key Realty, LLC and Ivan Utah Realtor.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <HeroSub
        title="Terms & Conditions"
        description="Effective Date: August 26, 2026"
        badge="Legal"
      />

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
            <div className="blog-details markdown space-y-6 sm:space-y-8">
              <p>
                By using this website or submitting information through our forms, you agree to these Terms &amp; Conditions.
              </p>

              <h2>Real Estate Information</h2>
              <p>
                Information provided by Blue Key Realty, LLC and Ivan Utah Realtor is intended for general informational
                purposes and real estate services.
              </p>
              <p>
                Property availability, pricing, financing programs, interest rates, estimated payments, incentives, taxes,
                HOA information, and other real estate information may change and should be independently verified when
                applicable.
              </p>
              <p>
                Submitting a form or contacting us does not create an agency relationship unless otherwise established
                through the appropriate written agreement.
              </p>

              <h2>SMS Terms &amp; Conditions</h2>
              <p>
                If you provide your phone number and consent to receive communications, Blue Key Realty, LLC and/or Ivan
                Utah Realtor may send you SMS/text messages related to your real estate inquiry or relationship with us.
              </p>
              <p>Messages may include:</p>
              <ul>
                <li>Responses to real estate inquiries</li>
                <li>Property information</li>
                <li>Appointment confirmations and reminders</li>
                <li>Follow-up communications</li>
                <li>Scheduling updates</li>
                <li>Real estate service updates</li>
              </ul>
              <p>Message frequency may vary.</p>
              <p>Message and data rates may apply.</p>
              <p>You may cancel SMS communications at any time by replying STOP.</p>
              <p>
                After you send STOP, you may receive a confirmation message that you have been unsubscribed. After that,
                you will no longer receive SMS messages unless you opt in again.
              </p>
              <p>
                For assistance, reply HELP or contact us through the contact information provided on our website.
              </p>
              <p>Mobile carriers are not liable for delayed or undelivered messages.</p>
              <p>Consent to receive SMS messages is not a condition of purchasing goods or services.</p>
              <p>
                For information about how we collect, use, and protect personal information, please review our Privacy
                Policy.
              </p>

              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms &amp; Conditions periodically. Updates will be posted on this website with the
                applicable effective date.
              </p>

              <h2>Contact</h2>
              <p>Questions regarding these Terms &amp; Conditions may be directed to:</p>
              <p>
                Blue Key Realty, LLC / Ivan Utah Realtor
                <br />
                Website: <a href="https://www.ivanutahrealtor.com" target="_blank" rel="noreferrer">www.ivanutahrealtor.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloatingBubbles />
    </>
  )
}
