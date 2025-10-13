import Card from '../components/Card';

export default function FontGuide() {
  const items = [
    { cls: 'f-28b', label: 'Font / 28 Bold' },
    { cls: 'f-24b', label: 'Font / 24 Bold' },
    { cls: 'f-24r', label: 'Font / 24 Regular' },
    { cls: 'f-20b', label: 'Font / 20 Bold' },
    { cls: 'f-20r', label: 'Font / 20 Regular' },
    { cls: 'f-18b', label: 'Font / 18 Bold' },
    { cls: 'f-18r', label: 'Font / 18 Regular' },
    { cls: 'f-16b', label: 'Font / 16 Bold' },
    { cls: 'f-16r', label: 'Font / 16 Regular' },
    { cls: 'f-15b', label: 'Font / 15 Bold' },
    { cls: 'f-15r', label: 'Font / 15 Regular' },
    { cls: 'f-14b', label: 'Font / 14 Bold' },
    { cls: 'f-14r', label: 'Font / 14 Regular' },
    { cls: 'f-12r', label: 'Font / 12 Regular' },
  ];

  return (
    <div className="container">
      <Card title="Font">
        {items.map((it, idx) => (
          <div key={it.label}>
            <div className="row-2col" style={{ padding: '12px 0' }}>
              <div className="text-muted">{it.label}</div>
              <div className={it.cls}>가나다라마바사아자차카타파하</div>
            </div>
            {idx !== items.length - 1 && <div className="divider" />}
          </div>
        ))}
      </Card>
    </div>
  );
}