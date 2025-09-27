import { useEffect, useState } from 'react';

export default function About() {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    console.log(data);
    setData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to the About Page!</p>
    </div>
  );
}
