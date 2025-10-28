export default function StoresPage() {
    const stores = [
      {
        city: 'Mumbai',
        address: '123 Electronics Plaza, Andheri East',
        phone: '+91 22-1234-5678',
        hours: 'Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 7 PM'
      },
      {
        city: 'Delhi',
        address: '456 Tech Mall, Connaught Place',
        phone: '+91 11-2345-6789',
        hours: 'Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 7 PM'
      },
      {
        city: 'Bangalore',
        address: '789 Digital Avenue, Indiranagar',
        phone: '+91 80-3456-7890',
        hours: 'Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 7 PM'
      },
      {
        city: 'Chennai',
        address: '321 Gadget Street, T Nagar',
        phone: '+91 44-4567-8901',
        hours: 'Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 7 PM'
      }
    ];
  
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Our Stores</h1>
          <p style={styles.subtitle}>Visit us at our physical locations</p>
  
          <div style={styles.grid}>
            {stores.map((store, index) => (
              <div key={index} style={styles.storeCard}>
                <h3 style={styles.cityName}>{store.city}</h3>
                
                <div style={styles.infoRow}>
                  <span style={styles.label}>Address:</span>
                  <span style={styles.value}>{store.address}</span>
                </div>
  
                <div style={styles.infoRow}>
                  <span style={styles.label}>Phone:</span>
                  <span style={styles.value}>{store.phone}</span>
                </div>
  
                <div style={styles.infoRow}>
                  <span style={styles.label}>Hours:</span>
                  <span style={styles.value}>{store.hours}</span>
                </div>
              </div>
            ))}
          </div>
  
          <div style={styles.noteBox}>
            <p style={styles.noteText}>
              <strong>Note:</strong> Store timings may vary on public holidays. 
              Please call ahead to confirm.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F8F8F8',
      padding: '40px 20px'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1A1A1A',
      marginBottom: '8px',
      textAlign: 'center' as const
    },
    subtitle: {
      fontSize: '16px',
      color: '#9E9E9E',
      marginBottom: '48px',
      textAlign: 'center' as const
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    storeCard: {
      backgroundColor: '#FFFFFF',
      padding: '32px',
      borderRadius: '8px'
    },
    cityName: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '24px'
    },
    infoRow: {
      display: 'flex',
      flexDirection: 'column' as const,
      marginBottom: '16px'
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#9E9E9E',
      marginBottom: '4px'
    },
    value: {
      fontSize: '14px',
      color: '#333333',
      lineHeight: '1.6'
    },
    noteBox: {
      backgroundColor: '#FFFFFF',
      padding: '20px',
      borderRadius: '8px'
    },
    noteText: {
      fontSize: '14px',
      color: '#333333',
      lineHeight: '1.6'
    }
  };
  