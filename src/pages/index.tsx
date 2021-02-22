import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  console.log(recommendedProducts);
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

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();
  
  return {
    props: {
      recommendedProducts
    }
  }
}