import Image from "next/image";

export default function Home({ src, id, alt }) {
  return (
    <>
      <Image
        className="mask mask-squircle"
        priority={true}
        src={src}
        alt={alt}
        width={260}
        height={180}
        id={id}
      />
    </>
  );
}
