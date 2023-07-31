import Image from "next/image";

export default function Home({ src, id, alt }) {
  return (
    <>
      <Image
        className="mask mask-squircle"
        src={src}
        alt={alt}
        width={190}
        height={170}
        id={id}
      />
    </>
  );
}
