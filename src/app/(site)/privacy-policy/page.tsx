import HeroSub from '@/components/shared/HeroSub'
import { FloatingBubbles } from '@/components/Home/FloatingBubbles'

export const metadata = {
  title: 'Privacy Policy | Blue Key Realty',
  description: 'Privacy Policy for Blue Key Realty, LLC and Ivan Utah Realtor.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeroSub
        title="Privacy Policy"
        description="Effective Date: August 26, 2026"
        badge="Legal"
      />

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
            <div className="blog-details markdown space-y-6 sm:space-y-8">
              <p>
                Blue Key Realty, LLC and Ivan Utah Realtor (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respect
                your privacy and are committed to protecting the personal information you provide to us.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide through our website, contact forms,
                phone calls, text messages, emails, social media, open houses, events, or other communications.
              </p>
              <p>This information may include:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Real estate interests and preferences</li>
                <li>Property information</li>
                <li>Information you voluntarily provide regarding buying or selling real estate</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We may use your information to:</p>
              <ul>
                <li>Respond to real estate inquiries</li>
                <li>Provide information about buying or selling real estate</li>
                <li>Schedule and confirm appointments</li>
                <li>Follow up regarding properties or real estate services</li>
                <li>Send requested property information and real estate updates</li>
                <li>Provide reminders or important updates related to appointments or services</li>
                <li>Maintain our client and prospective-client relationships</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>We do not sell personal information or phone numbers.</p>
              <p>Data will not be sold or shared with third parties for marketing or promotional purposes.</p>
              <p>
                We may share information when reasonably necessary to provide services requested by you, comply with
                applicable law, protect our legal rights, or work with service providers that assist us in operating our
                business.
              </p>

              <h2>SMS/Text Messaging</h2>
              <p>
                If you consent to receive SMS/text messages from Blue Key Realty, LLC and/or Ivan Utah Realtor, messages
                may include communications related to real estate inquiries, requested property information,
                appointments, reminders, follow-up, and service updates.
              </p>
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

              <h2>Cookies and Website Technologies</h2>
              <p>
                Our website may use cookies, analytics, and similar technologies to understand website usage, improve
                the user experience, and measure marketing performance.
              </p>

              <h2>Data Security</h2>
              <p>
                We take reasonable administrative and technical measures to protect the personal information provided
                to us. However, no internet-based system can guarantee absolute security.
              </p>

              <h2>Your Choices</h2>
              <p>
                You may contact us to request that we update or correct information you have provided. You may also
                unsubscribe from marketing emails through the unsubscribe option provided in those communications and
                opt out of SMS messages by replying STOP.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy or how your information is handled, please contact:</p>
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
