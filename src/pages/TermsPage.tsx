import { Link } from 'react-router-dom';

export function TermsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: February 2026</p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Bluo, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using this service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              You agree to accept responsibility for all activities that occur under your account.
              You must be at least 13 years of age to create an account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. User Content</h2>
            <p>
              You retain ownership of content you post on Bluo. By posting content, you grant Bluo
              a non-exclusive, worldwide, royalty-free license to use, display, and distribute your
              content in connection with the service. You are solely responsible for the content you
              post.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Subscriptions and Payments</h2>
            <p>
              Paid subscription plans are billed on a recurring monthly basis. You may cancel your
              subscription at any time. Cancellation takes effect at the end of the current billing
              period. Refunds are handled in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Prohibited Conduct</h2>
            <p>
              You agree not to engage in harassment, spam, impersonation, distribution of malware,
              or any activity that violates applicable laws. Bluo reserves the right to suspend or
              terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. AI Features</h2>
            <p>
              AI-generated content suggestions are provided as-is and may not always be accurate.
              You are responsible for reviewing and editing AI suggestions before publishing.
              AI feature availability depends on your subscription tier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Limitation of Liability</h2>
            <p>
              Bluo is provided on an &quot;as is&quot; basis. We make no warranties, express or implied,
              regarding the service. In no event shall Bluo be liable for any indirect, incidental,
              or consequential damages arising from the use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Changes to Terms</h2>
            <p>
              Bluo reserves the right to modify these terms at any time. We will notify users of
              material changes via the platform. Continued use of the service after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Contact</h2>
            <p>
              If you have questions about these Terms, please contact us through the Bluo platform.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
