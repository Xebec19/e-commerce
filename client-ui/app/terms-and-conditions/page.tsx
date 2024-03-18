import { environment } from "@/lib";
import Link from "next/link";

export default async function TermsAndConditions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8">
      <div className="flex flex-col gap-4 md:col-span-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl prose font-bold">Terms and Conditions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last updated: March 17, 2024
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <section>
            <h2 className="text-xl prose leading-10">Introduction</h2>
            <p>
              Welcome to the Terms and Conditions for Acme Corporation. These
              terms are important and affect your legal rights, so please read
              them carefully. By accessing or using the website, you agree to be
              bound by these terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Acceptance of Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these
              website Terms and Conditions of Use, all applicable laws, and
              regulations, and agree that you are responsible for compliance
              with any applicable local laws. If you do not agree with any of
              these terms, you are prohibited from using or accessing this site.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Product Listings</h2>
            <p>
              We make every effort to ensure that the information on our website
              is accurate. However, we cannot guarantee that all product
              descriptions or other content are accurate, complete, reliable,
              current, or error-free.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Pricing and Payment</h2>
            <p>
              Prices for our products are subject to change without notice. We
              reserve the right to modify or discontinue the Service (or any
              part or content thereof) without notice at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Shipping and Delivery</h2>
            <p>
              We will make every effort to deliver your order within the
              estimated timeframe. However, we are not responsible for delays
              beyond our control.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Returns and Refunds</h2>
            <p>
              Our Return & Refund Policy provides detailed information about
              options and procedures for returning your order.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Intellectual Property</h2>
            <p>
              All content included on this site, such as text, graphics, logos,
              button icons, images, audio clips, digital downloads, data
              compilations, and software, is the property of the Company or its
              content suppliers and protected by international copyright laws.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Privacy Policy</h2>
            <p>
              Our Privacy Policy describes how we collect, use, and disclose
              information about you and your use of the Services.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Disclaimer</h2>
            <p>
              To the fullest extent permitted by law, we disclaim all
              warranties, express or implied, in connection with the website and
              your use thereof.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of the State of example-state without
              regard to its conflict of laws principles.
            </p>
          </section>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl prose leading-10">Contact Us</h2>
          <p className="text-gray-500 dark:text-gray-400">
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">{environment.PHONE_NUMBER}</div>
        </div>
      </div>
    </div>
  );
}
