export default function AboutPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-1'>Über uns</h1>
      <p className='text-gray-500 mb-6'>Wer steht hinter QSK?</p>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Angaben gemäß § 5 TMG</h2>
        <div className='mb-4'>
          <p>Deen Akademie</p>
          <p>Abdirahman Farah</p>
          <p>Auf der Hardt 119</p>
          <p>45889 Gelsenkirchen, Deutschland</p>
        </div>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Vertreten durch</h2>
        <p>Abdirahman Farah</p>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Kontakt</h2>
        <p>E-Mail: support@deen-akademie.de</p>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>EU-Streitschlichtung</h2>
        <p className='mb-2'>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
          <a
            href='http://ec.europa.eu/consumers/odr/'
            className='text-[#4AA4DE] hover:underline'
          >
            http://ec.europa.eu/consumers/odr/
          </a>{' '}
          finden. Wir sind weder verpflichtet noch bereit, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
        <p>
          Unsere direkte Kommunikation mit Kunden hat sich bisher als effektiv
          erwiesen.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Haftung für Inhalte</h2>
        <p className='mb-4'>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Haftung für Links</h2>
        <p className='mb-4'>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Urheberrecht</h2>
        <p className='mb-4'>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p className='mb-4'>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
        </p>
        <p>
          Quelle:{' '}
          <a
            href='https://www.e-recht24.de'
            className='text-[#4AA4DE] hover:underline'
          >
            https://www.e-recht24.de
          </a>
        </p>
      </section>
    </div>
  );
} 