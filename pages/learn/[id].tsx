import React, { memo } from "react";
import Layout from "../../src/components/Layout/Layout";
import { useRouter } from 'next/router'
import Learn from "../../src/components/Learn/Learn";

const LearnPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout
      siteTitle={`Learn ${id as string || ''}`}
      siteDescription={`Learn ${id}`}
    >
      <Learn />
    </Layout>
  );
};

export default memo(LearnPage);