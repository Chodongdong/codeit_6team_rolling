import Card from '../components/Card';

type Group = {
  name: string;
  tokens: string[];
  borderLight?: boolean;
};

const groups: Group[] = [
  { name: 'Purple', tokens: ['--purple-100','--purple-200','--purple-300','--purple-400','--purple-500','--purple-600','--purple-700','--purple-800','--purple-900'], borderLight: true },
  { name: 'Beige', tokens: ['--beige-100','--beige-200','--beige-300','--beige-400','--beige-500'], borderLight: true },
  { name: 'Blue', tokens: ['--blue-100','--blue-200','--blue-300','--blue-400','--blue-500'], borderLight: true },
  { name: 'Green', tokens: ['--green-100','--green-200','--green-300','--green-400','--green-500'], borderLight: true },
  { name: 'Grayscale', tokens: ['--gray-100','--gray-200','--gray-300','--gray-400','--gray-500','--gray-600','--gray-700','--gray-800','--gray-900'], borderLight: true },
];

export default function ColorGuide() {
  return (
    <div className="container">
      <Card title="Colors">
        {groups.map((g) => (
          <div
            key={g.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <div className="text-muted">{g.name}</div>
            <div
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: '56px',
                gap: 12,
              }}
            >
              {g.tokens.map((t) => (
                <div
                  key={t}
                  style={{
                    height: 28,
                    borderRadius: 6,
                    background: `var(${t})`,
                    border: g.borderLight ? '1px solid var(--color-border)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            alignItems: 'center',
            gap: 12,
            marginTop: 8,
          }}
        >
          <div className="text-muted">White</div>
          <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '56px', gap: 12 }}>
            <div style={{ height: 28, borderRadius: 6, background: 'var(--white)', border: '1px solid var(--color-border)' }} />
          </div>

          <div className="text-muted">Black</div>
          <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '56px', gap: 12 }}>
            <div style={{ height: 28, borderRadius: 6, background: 'var(--black)' }} />
          </div>

          <div className="text-muted">Error</div>
          <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '56px', gap: 12 }}>
            <div style={{ height: 28, borderRadius: 6, background: 'var(--error)' }} />
          </div>

          <div className="text-muted">Surface</div>
          <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '56px', gap: 12 }}>
            <div style={{ height: 28, borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--color-border)' }} />
          </div>
        </div>
      </Card>
    </div>
  );
}