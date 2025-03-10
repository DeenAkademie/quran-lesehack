export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">About us</h1>
      <p className="text-gray-500 mb-6">Who is behind QSK?</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Information in accordance with Section 5 of the German Telemedia Act (TMG)</h2>
        <div className="mb-4">
          <p>Deen Akademie</p>
          <p>Abdirahman Farah</p>
          <p>Auf der Hardt 119</p>
          <p>45889 Gelsenkirchen, Germany</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Represented by</h2>
        <p>Abdirahman Farah</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <p>Email: support@deen-akademie.de</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">EU Dispute Resolution</h2>
        <p className="mb-2">
          The European Commission provides a platform for online dispute resolution (ODR), available at{' '}
          <a href="http://ec.europa.eu/consumers/odr/" className="text-[#4AA4DE] hover:underline">
            http://ec.europa.eu/consumers/odr/
          </a>
          . We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
        </p>
        <p>Our direct communication with customers has proven effective so far.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Liability for Content</h2>
        <p className="mb-4">
          As a service provider, we are responsible for our own content on these pages in accordance with Section 7(1) TMG and general laws. However, under Sections 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.
        </p>
        <p>
          Obligations to remove or block the use of information under general laws remain unaffected. Liability in this respect, however, is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will promptly remove the content.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Liability for Links</h2>
        <p className="mb-4">
          Our website contains links to external websites operated by third parties, over whose content we have no control. Therefore, we cannot accept any responsibility for these external contents. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. No illegal content was detected at the time of linking.
        </p>
        <p>
          Continuous monitoring of the linked pages&apos; content is not reasonable without concrete indications of legal violations. Upon becoming aware of such violations, we will promptly remove the links in question.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Copyright</h2>
        <p className="mb-4">
          The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution, or any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are permitted only for private, non-commercial use.
        </p>
        <p className="mb-4">
          Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. Specifically, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please notify us accordingly. Upon becoming aware of violations, we will promptly remove the offending content.
        </p>
        <p>
          Source:{' '}
          <a href="https://www.e-recht24.de" className="text-[#4AA4DE] hover:underline">
            https://www.e-recht24.de
          </a>
        </p>
      </section>
    </div>
  );
} 