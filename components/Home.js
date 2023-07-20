import Image from "next/image";

export default function Home({ src, id, alt }) {
  return (
    <>
      <Image src={src} alt={alt} width={90} height={90} id={id} />
    </>
  );
}
