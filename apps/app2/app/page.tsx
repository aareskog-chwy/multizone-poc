import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });

  console.log('app2 session', session);

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_APP1_URL}/signin`);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <h1>Application #2</h1>
        <a href="/" className={styles.secondary}>Go to application #1</a>
       </main>
    </div>
  );
}
