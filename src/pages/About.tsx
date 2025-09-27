import { useEffect, useState } from 'react';

export default function About() {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to the About Page!</p>
    </div>
  );
}
