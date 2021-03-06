import { GetStaticProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface ITop10Props {
  products: IProduct[];
}

export default function Top10({ products }: ITop10Props) {
  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ITop10Props> = async () => {

  const response = await fetch(' http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 5
  }
}