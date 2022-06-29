import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

function ChirpPage() {
  const router = useRouter();

  return <div>Chirp page</div>;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("");
//   const data = await res.json();
//   return { props: Object };
// };

export default ChirpPage;
