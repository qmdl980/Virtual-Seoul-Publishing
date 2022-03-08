// import "../public/stylesheets/common.css";
import "../public/stylesodc/headnav.scss";
import "../public/stylesodc/loginboard.scss";
import "../public/stylesodc/titlenevent.scss";
import "../public/stylesodc/textforms.scss";
import "../public/stylesodc/modal.scss";
import "../public/stylesheets/cms.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apolloClient";
import { useRouter } from "next/router";
import MiceContainer from "../components/layout/MiceContainer";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const endpoint = pathname.split("/")[1];

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    // <ApolloProvider client={apolloClient}>
    //   <Component {...pageProps} />
    // </ApolloProvider>
    <ApolloProvider client={apolloClient}>
      {endpoint === "mice" &&
      !pathname.includes("/login") &&
      !pathname.includes("/logout") &&
      pathname.split("/")[2] ? (
        <MiceContainer>
          <Component {...pageProps} />
        </MiceContainer>
      ) : (
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  );
};

export default MyApp;
