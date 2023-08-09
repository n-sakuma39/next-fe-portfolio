import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/WorksList/WorksList.module.scss";
import Layout from "@/components/Layout/Layout";
import { getWorksData } from "@/utils/getWorksData";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MonthlyArchive({ works, category, tag }) {
  const router = useRouter();
  const { date } = router.query;
  const formattedDate = date.replace("_", "-");
  const parsedDate = dayjs(`${formattedDate}-01`, "YYYY-MM").tz("Asia/Tokyo");
  console.log("Parsed Date:", parsedDate.format("YYYY年M月"));

  // 指定した年月のみの投稿をフィルタリング
  const filteredWorks = works.filter((work) => {
    const workYearMonth = dayjs(work.publishedAt)
      .tz("Asia/Tokyo")
      .format("YYYY年M月");
    return workYearMonth === parsedDate.format("YYYY年M月");
  });

  return (
    <Layout showSidebar={true} category={category} tag={tag} works={works}>
      <section className={`${styles.works} section`}>
        <div className="box">
          <h2 className="title">
            {parsedDate.format("YYYY年M月")}
          </h2>
          <ul className={styles.worksList}>
            {filteredWorks.map((work) => (
              <li className={styles.worksItem} key={work.id}>
                <Link href={`/works/detail/${work.id}`} passHref legacyBehavior>
                  <a>
                    <div className={styles.worksImg}>
                      <Image
                        src={work.thumbnail.url}
                        alt={work.title}
                        width={400}
                        height={300}
                      />
                      {work.category && (
                        <span className={styles.worksCategory}>
                          {work.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className={styles.worksName}>{work.title}</h3>
                    <p className={styles.publishedAt}>
                      {dayjs
                        .utc(work.publishedAt)
                        .tz("Asia/Tokyo")
                        .format("YYYY" + "年" + "MM" + "月" + "DD" + "日")}
                    </p>
                    <p className={styles.worksTag}>
                      {work.tag.map((tag) => (
                        <span key={tag.id}>{tag.tag || ""}</span>
                      ))}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { date } = params;
  const formattedDate = date.replace("_", "-");
  const parsedDate = dayjs(`${formattedDate}-01`, "YYYY-MM").tz("Asia/Tokyo");
  const formattedYearMonth = parsedDate.format("YYYY年M月");

  const { works, category, tag } = await getWorksData(
    1,
    "",
    "",
    formattedYearMonth
  );

  return {
    props: {
      works,
      category,
      tag,
    },
  };
}

export async function getStaticPaths() {
  const { works } = await getWorksData();

  const yearMonths = [
    ...new Set(
      works.map((work) =>
        dayjs(work.publishedAt).tz("Asia/Tokyo").format("YYYY-MM")
      )
    ),
  ];
  const paths = yearMonths.map((ym) => ({
    params: {
      date: ym.replace("-", "_"),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}