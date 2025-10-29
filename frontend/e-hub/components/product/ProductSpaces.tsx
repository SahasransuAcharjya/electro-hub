'use client';

interface ProductSpecsProps {
  specifications: { [key: string]: string };
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Specifications</h3>
      
      <table style={styles.table}>
        <tbody>
          {Object.entries(specifications).map(([key, value]) => (
            <tr key={key} style={styles.row}>
              <td style={styles.key}>{key}</td>
              <td style={styles.value}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '8px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  row: {
    borderBottom: '1px solid #F5F5F5'
  },
  key: {
    padding: '12px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333333',
    width: '40%'
  },
  value: {
    padding: '12px 0',
    fontSize: '14px',
    color: '#9E9E9E'
  }
};
