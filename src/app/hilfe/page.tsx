import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HelpPage() {
  const faqs = [
    {
      question: "Was ist Quran LeseHack?",
      answer: "Quran LeseHack ist eine Lernapp, mit der du den Quran in 28 Lektionen lernen kannst. Jede Lektion entspricht einem der 28 arabischen Buchstaben."
    },
    {
      question: "Wie funktioniert das Lernsystem?",
      answer: "Das Lernsystem basiert auf den 28 arabischen Buchstaben. Du lernst Schritt für Schritt jeden Buchstaben kennen und wie du ihn im Quran lesen kannst. Jede Lektion enthält Erklärungen, Übungen und Quizze, um dein Wissen zu festigen."
    },
    {
      question: "Was sind Hasanat?",
      answer: "Hasanat sind Belohnungspunkte, die du für abgeschlossene Lektionen, Übungen und Quizze erhältst. Sie motivieren dich, weiterzulernen und zeigen deinen Fortschritt an."
    },
    {
      question: "Kann ich meinen Fortschritt speichern?",
      answer: "Ja, dein Fortschritt wird automatisch gespeichert. Du kannst jederzeit sehen, welche Lektionen du bereits abgeschlossen hast und wo du noch üben musst."
    },
    {
      question: "Wie lange dauert es, den Quran lesen zu lernen?",
      answer: "Die Lernzeit ist individuell verschieden. Mit regelmäßigem Üben kannst du jedoch innerhalb weniger Wochen die Grundlagen des Quran-Lesens erlernen."
    }
  ];

  const contactInfo = {
    email: "kontakt@deen-akademie.de",
    phone: "+49 123 456789",
    address: "Musterstraße 123, 12345 Berlin"
  };

  const aboutApp = {
    version: "1.0.0",
    releaseDate: "01.01.2023",
    developers: "Deen Akademie Team",
    license: "Alle Rechte vorbehalten"
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Hilfe & Support</h1>

      <Tabs defaultValue="faq">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Kontakt</TabsTrigger>
          <TabsTrigger value="about">Über die App</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kontaktinformationen</CardTitle>
              <CardDescription>Bei Fragen oder Problemen kannst du uns gerne kontaktieren</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">E-Mail</h3>
                <p>{contactInfo.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Telefon</h3>
                <p>{contactInfo.phone}</p>
              </div>
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p>{contactInfo.address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Über Quran LeseHack</CardTitle>
              <CardDescription>Informationen über die App</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Version</h3>
                <p>{aboutApp.version}</p>
              </div>
              <div>
                <h3 className="font-medium">Veröffentlichungsdatum</h3>
                <p>{aboutApp.releaseDate}</p>
              </div>
              <div>
                <h3 className="font-medium">Entwickler</h3>
                <p>{aboutApp.developers}</p>
              </div>
              <div>
                <h3 className="font-medium">Lizenz</h3>
                <p>{aboutApp.license}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 