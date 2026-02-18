import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-500 tracking-tight">
            Bluo
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: February 2026</p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address, profile
              information, and content you post. We also collect usage data including interactions,
              device information, and log data to improve the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>
              We use your information to provide and improve the Bluo service, personalize your
              experience, process payments for subscription services, send notifications, and ensure
              the security of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Payment Information</h2>
            <p>
              Payment processing is handled by Stripe. We do not store your full credit card
              details on our servers. Stripe&apos;s privacy policy governs the handling of your
              payment information. We retain only transaction records necessary for billing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with service providers who
              help us operate the platform (e.g., hosting, payment processing, analytics). We may
              disclose information when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. AI and Content Analysis</h2>
            <p>
              When you use AI features, your content may be processed to generate suggestions.
              AI-processed data is not used to train models without your explicit consent.
              You can opt out of AI features at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to
              provide services. You may request deletion of your account and associated data at any
              time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may
              export your data at any time. You can manage notification preferences and privacy
              settings from your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Cookies and Tracking</h2>
            <p>
              We use essential cookies to maintain your session and preferences. Analytics cookies
              help us understand how the service is used. You can manage cookie preferences through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Security</h2>
            <p>
              We implement industry-standard security measures to protect your information,
              including encryption in transit and at rest. However, no system is completely secure
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Contact</h2>
            <p>
              For privacy-related inquiries, please contact us through the Bluo platform.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
