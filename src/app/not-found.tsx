export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem',
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#2563eb',
            marginBottom: '0.5rem',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
          }}
        >
          Seite nicht gefunden
        </h2>
      </div>
    </div>
  );
}
