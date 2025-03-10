import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HighscoresPage() {
  // This would come from the database in the real implementation
  const weeklyHighscores = [
    { id: 1, name: "Ahmed Mustafa", avatar: "/img/avatar.png", hasanat: 450, completedLessons: 3 },
    { id: 2, name: "Fatima Khan", avatar: "/img/avatar2.png", hasanat: 380, completedLessons: 2 },
    { id: 3, name: "Mohammed Ali", avatar: "/img/avatar3.png", hasanat: 320, completedLessons: 2 },
    { id: 4, name: "Aisha Rahman", avatar: "/img/avatar4.png", hasanat: 290, completedLessons: 1 },
    { id: 5, name: "Omar Farooq", avatar: "/img/avatar5.png", hasanat: 250, completedLessons: 1 },
  ];

  const monthlyHighscores = [
    { id: 1, name: "Fatima Khan", avatar: "/img/avatar2.png", hasanat: 1250, completedLessons: 8 },
    { id: 2, name: "Ahmed Mustafa", avatar: "/img/avatar.png", hasanat: 1100, completedLessons: 7 },
    { id: 3, name: "Omar Farooq", avatar: "/img/avatar5.png", hasanat: 980, completedLessons: 6 },
    { id: 4, name: "Aisha Rahman", avatar: "/img/avatar4.png", hasanat: 850, completedLessons: 5 },
    { id: 5, name: "Mohammed Ali", avatar: "/img/avatar3.png", hasanat: 720, completedLessons: 4 },
  ];

  const allTimeHighscores = [
    { id: 1, name: "Omar Farooq", avatar: "/img/avatar5.png", hasanat: 12500, completedLessons: 28 },
    { id: 2, name: "Fatima Khan", avatar: "/img/avatar2.png", hasanat: 10800, completedLessons: 25 },
    { id: 3, name: "Ahmed Mustafa", avatar: "/img/avatar.png", hasanat: 9200, completedLessons: 22 },
    { id: 4, name: "Mohammed Ali", avatar: "/img/avatar3.png", hasanat: 7500, completedLessons: 18 },
    { id: 5, name: "Aisha Rahman", avatar: "/img/avatar4.png", hasanat: 6300, completedLessons: 15 },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Highscores</h1>

      <Tabs defaultValue="weekly">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Wöchentlich</TabsTrigger>
          <TabsTrigger value="monthly">Monatlich</TabsTrigger>
          <TabsTrigger value="alltime">Gesamt</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-6">
          <HighscoreTable title="Wöchentliche Bestenliste" data={weeklyHighscores} />
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <HighscoreTable title="Monatliche Bestenliste" data={monthlyHighscores} />
        </TabsContent>
        
        <TabsContent value="alltime" className="mt-6">
          <HighscoreTable title="Gesamte Bestenliste" data={allTimeHighscores} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface HighscoreTableProps {
  title: string;
  data: {
    id: number;
    name: string;
    avatar: string;
    hasanat: number;
    completedLessons: number;
  }[];
}

function HighscoreTable({ title, data }: HighscoreTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rang</TableHead>
              <TableHead>Benutzer</TableHead>
              <TableHead className="text-right">Hasanat</TableHead>
              <TableHead className="text-right">Abgeschlossene Lektionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{user.hasanat}</TableCell>
                <TableCell className="text-right">{user.completedLessons}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 