export default function Card({ title, className = '', style, children, footer }: {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`card ${className}`} style={style}>
      {title && <div className="f-18b" style={{ marginBottom: 12 }}>{title}</div>}
      {children}
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </div>
  );
}