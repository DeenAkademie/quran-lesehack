'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Plus, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ChildData {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    user_name: '',
    gender: 'male',
    plan: 'qsk-light',
    lang_code: 'de',
    role: 'student',
  });

  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildren] = useState<ChildData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (
    index: number,
    field: keyof ChildData,
    value: string
  ) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setChildren(updatedChildren);
  };

  const addChild = () => {
    setChildren([
      ...children,
      { first_name: '', last_name: '', email: '', gender: 'male' },
    ]);
  };

  const removeChild = (index: number) => {
    const updatedChildren = children.filter((_, i) => i !== index);
    setChildren(updatedChildren);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung
    if (formData.password !== formData.confirmPassword) {
      toast.error('Die Passwörter stimmen nicht überein.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Das Passwort muss mindestens 8 Zeichen lang sein.');
      return;
    }

    try {
      setIsLoading(true);

      // Bestimme die Rolle basierend auf dem Vorhandensein von Kindern
      let effectiveRole = formData.role;
      if (hasChildren && children.length > 0) {
        effectiveRole = 'parent';
      }

      // Bereite Kinderdaten vor - leere E-Mails als undefined setzen
      const processedChildren = hasChildren
        ? children.map((child) => ({
            ...child,
            email: child.email.trim() === '' ? undefined : child.email.trim(),
          }))
        : undefined;

      // Vorbereiten der Daten für die API
      const signUpData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_name:
          formData.user_name ||
          `${formData.first_name.toLowerCase()}.${formData.last_name.toLowerCase()}`,
        gender: formData.gender,
        plan: formData.plan,
        lang_code: formData.lang_code,
        role: effectiveRole,
        children: processedChildren,
      };

      console.log('Plan-Wert:', formData.plan);
      console.log(
        'Vollständige Registrierungsdaten:',
        JSON.stringify(signUpData, null, 2)
      );

      // Normale Registrierung durchführen
      const result = await signUp(signUpData);
      console.log('Registrierungsergebnis:', result);

      toast.success(
        'Benutzer wurde erfolgreich erstellt. Bitte melde dich an.'
      );

      // Weiterleitung zur Login-Seite
      router.push('/login');
    } catch (error: unknown) {
      console.error('Registrierungsfehler vollständig:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Bei der Registrierung ist ein Fehler aufgetreten.';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Neuen Benutzer erstellen</CardTitle>
        <CardDescription>
          Erstelle einen neuen Benutzer für die Quran LeseHack Plattform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Tabs defaultValue='main' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='main'>Hauptkonto</TabsTrigger>
              <TabsTrigger value='children' disabled={!hasChildren}>
                Kinderkonten
              </TabsTrigger>
            </TabsList>

            <TabsContent value='main' className='space-y-4 pt-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='first_name'>Vorname</Label>
                  <Input
                    id='first_name'
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='last_name'>Nachname</Label>
                  <Input
                    id='last_name'
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='user_name'>Benutzername (optional)</Label>
                <Input
                  id='user_name'
                  name='user_name'
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder={
                    formData.first_name && formData.last_name
                      ? `${formData.first_name.toLowerCase()}.${formData.last_name.toLowerCase()}`
                      : 'Wird automatisch generiert'
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>E-Mail</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='gender'>Geschlecht</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange('gender', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Geschlecht auswählen' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>Männlich</SelectItem>
                      <SelectItem value='female'>Weiblich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='plan'>Plan</Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value) => handleSelectChange('plan', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Plan auswählen' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='qsk-light'>QSK Light</SelectItem>
                      <SelectItem value='qsk-basic'>QSK Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='role'>Rolle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange('role', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Rolle auswählen' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='student'>Schüler</SelectItem>
                    <SelectItem value='teacher'>Lehrer</SelectItem>
                    <SelectItem value='admin'>Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Passwort</Label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Passwort bestätigen</Label>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='flex items-center space-x-2 pt-4'>
                <Checkbox
                  id='hasChildren'
                  checked={hasChildren}
                  onCheckedChange={(checked) => {
                    setHasChildren(!!checked);
                    if (!!checked && children.length === 0) {
                      addChild();
                    }
                  }}
                />
                <Label htmlFor='hasChildren' className='font-medium'>
                  Ich möchte Kinderkonten erstellen{' '}
                  <span className='text-xs text-muted-foreground'>
                    (Deine Rolle wird automatisch auf &quot;Eltern&quot;
                    gesetzt)
                  </span>
                </Label>
              </div>
            </TabsContent>

            <TabsContent value='children' className='pt-4'>
              {children.map((child, index) => (
                <div key={index} className='border rounded-lg p-4 mb-4'>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-medium'>Kind {index + 1}</h3>
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={() => removeChild(index)}
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='space-y-2'>
                      <Label htmlFor={`child-first-name-${index}`}>
                        Vorname
                      </Label>
                      <Input
                        id={`child-first-name-${index}`}
                        value={child.first_name}
                        onChange={(e) =>
                          handleChildChange(index, 'first_name', e.target.value)
                        }
                        required={hasChildren}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor={`child-last-name-${index}`}>
                        Nachname
                      </Label>
                      <Input
                        id={`child-last-name-${index}`}
                        value={child.last_name}
                        onChange={(e) =>
                          handleChildChange(index, 'last_name', e.target.value)
                        }
                        required={hasChildren}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor={`child-email-${index}`}>
                        E-Mail (optional)
                      </Label>
                      <Input
                        id={`child-email-${index}`}
                        type='email'
                        value={child.email}
                        onChange={(e) =>
                          handleChildChange(index, 'email', e.target.value)
                        }
                        placeholder={`Wird automatisch generiert, falls leer`}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor={`child-gender-${index}`}>
                        Geschlecht
                      </Label>
                      <Select
                        value={child.gender}
                        onValueChange={(value) =>
                          handleChildChange(index, 'gender', value)
                        }
                      >
                        <SelectTrigger id={`child-gender-${index}`}>
                          <SelectValue placeholder='Geschlecht auswählen' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Männlich</SelectItem>
                          <SelectItem value='female'>Weiblich</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type='button'
                variant='outline'
                onClick={addChild}
                className='w-full'
              >
                <Plus className='mr-2 h-4 w-4' /> Weiteres Kind hinzufügen
              </Button>
            </TabsContent>
          </Tabs>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Wird erstellt...
              </>
            ) : (
              'Benutzer erstellen'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center text-sm text-gray-500'>
        Alle mit * markierten Felder sind erforderlich.
      </CardFooter>
    </Card>
  );
}
