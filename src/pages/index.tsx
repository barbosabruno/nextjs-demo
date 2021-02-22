import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended')
    .then(res => res.json())
    .then(setRecommendedProducts);
  }, []);

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(r => (
            <li key={r.id}>
              {r.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
