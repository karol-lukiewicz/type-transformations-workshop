import { Equal, Expect } from "../helpers/type-utils";

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// type InferPropsFromServerSideFunction<T extends (...args: any) => any> = 
//   T extends (...args: any) => Promise<{ props: infer Props}> 
//     ? Props 
//     : never;

// type AwaitedReturnType<T extends (...args: any) => any> =  Awaited<ReturnType<T>>
// type InferPropsFromServerSideFunction<T extends (...args: any) => any> = AwaitedReturnType<T> extends {"props": infer Props } ? Props : never

type InferPropsFromServerSideFunction<T extends (...args: any) => any> = Awaited<ReturnType<T>> extends {"props": infer Props } ? Props : never

type tmp = InferPropsFromServerSideFunction<typeof getServerSideProps>

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];
