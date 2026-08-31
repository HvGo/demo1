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
              <p>1. We use SMS to confirm appointments, send reminders, and notify clients of schedule updates or important changes.</p>
              <p>
                2. You can cancel the SMS service at any time. Just text &quot;STOP&quot;. After you send the SMS message
                &quot;STOP&quot; to us, we will send you an SMS message to confirm that you have been unsubscribed. After
                this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did
                the first time, and we will start sending SMS messages to you again.
              </p>
              <p>
                3. If you are experiencing issues with the messaging program, you can reply with the keyword
                &quot;HELP&quot; for more assistance, or you can get help directly at{' '}
                <a href="mailto:Ivan@teambluekeyrealty.com">Ivan@teambluekeyrealty.com</a>.
              </p>
              <p>4. Carriers are not liable for delayed or undelivered messages.</p>
              <p>
                5. As always, message and data rates may apply for any messages sent to you from us and to us from you.
                Message frequency may vary. If you have any questions about your text plan or data plan, it is best to
                contact your wireless provider.
              </p>
              <p>
                6. If you have any questions regarding privacy, please read our privacy policy:{' '}
                <a href="/privacy-policy">Privacy Policy</a>.
              </p>
              <p>Consent to receive SMS messages is not a condition of purchasing goods or services.</p>

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
