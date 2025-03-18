import { SignupForm } from '@/components/signup-form';

export default function NewUserPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Neuen Benutzer erstellen
      </h1>
      <SignupForm />
    </div>
  );
}
