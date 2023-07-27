import "@/styles/globals.css";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
// import useSWR from "swr";
// import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  // const { data } = useSWR("/api/tasks", { fallbackData: [] });
  // const updateData = data?.map((item) => ({ ...item, isDone: false }));
  // console.log(updateData);
  // const [tasks, setDoneList] = useLocalStorageState("tasks", data);
  // console.log(data);
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Layout>
        <Component
          {...pageProps}
          // data={updateData}
          // tasks={tasks}
          // setDoneList={setDoneList}
        />
      </Layout>
    </SWRConfig>
  );
}
