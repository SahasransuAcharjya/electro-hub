export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div style={styles.container}>
        {children}
      </div>
    );
  }
  
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F8F8F8'
    }
  };
  