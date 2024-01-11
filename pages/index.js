import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '/components/Layout';
import utilStyle from '../styles/utils.module.css';
import styles from '../styles/Home.module.css';
import { getPostsData } from '@/lib/post';
import { siteTitle } from '@/components/Layout';

//SSG 外部から一度だけデータを読み込む。　getPostsDatadeにデータがある
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>Here is Tomoko Uehara.</p>
      </section>
      <section>
        <h2>Blog : todays lesson</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail})=>(
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage} 
                ></img>
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>${title}</a>
              </Link>
            <br />
            <small className={utilStyle.lightText}>
              ${date}
            </small>
          </article>
          ))
        }
        </div>
      </section>
    </Layout>
  )
}
