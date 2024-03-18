import { environment } from "@/lib";

export default async function PrivacyPolicy() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8">
      <div className="flex flex-col gap-4 md:col-span-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl prose font-bold">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last updated: March 17, 2024
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <section>
            <h2 className="text-xl prose leading-10">
              Information Collection And Use
            </h2>
            <p>
              For a better experience while using our Service, We may require
              you to provide us with certain personally identifiable
              information, including but not limited to username, email,
              shipping address, password, phone. The information that We request
              is will be retained by us and used as described in this privacy
              policy. This includes communication for welcoming newly registered
              users, follow ups for order fulfillment purposes, marketing
              promotions and user engagements. We also collect your payment
              detail information but this data is not retained in our system.
              The app does use third party services that may collect information
              used to identify you.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Cookies</h2>
            <p>
              Cookies are files with small amount of data that is commonly used
              an anonymous unique identifier. These are sent to your browser
              from the website that you visit and are stored on your
              devices&apos;s internal memory. Check if this is true for your
              app, if unsure, just assume that you do use cookies and modify
              this next line This Services does not uses these
              &quot;cookies&quot; explicitly. However, the app may use third
              party code and libraries that use &quot;cookies&quot; to
              collection information and to improve their services. You have the
              option to either accept or refuse these cookies, and know when a
              cookie is being sent to your device. If you choose to refuse our
              cookies, you may not be able to use some portions of this Service.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">Security</h2>
            <p>
              We value your trust in providing us your Personal Information,
              thus We are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and We cannot guarantee its absolute security.
            </p>
          </section>
          <section>
            <h2 className="text-xl prose leading-10">
              Changes To This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. These changes are effective immediately, after they are
              posted on this page.
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
