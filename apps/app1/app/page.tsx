import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./_lib/auth";

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

const getSesssion = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  });

  console.log('app1 session', session);

  if (!session) {
    redirect('/signin');
  }

  return session;

}

export default async function Home() {
  await getSesssion();

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
        <h1>Application #1</h1>
        <a href="/app2" className={styles.secondary}>Go to application #2</a>
       </main>
    </div>
  );
}
