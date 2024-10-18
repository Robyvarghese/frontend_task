import React, { memo } from "react";
import Layout from "../../src/components/Layout/Layout";
import { useRouter } from 'next/router'
import Shop from "../../src/components/Shop/Shop";

function ShopPage() {
  const router = useRouter()
  const { id } = router.query

  return ( 
    <Layout
      siteTitle = {`Shop ${id as string || ''}`}
      siteDescription= {`Shop ${id}`}
    >
      <Shop/>
    </Layout>
  );
};

export default memo(ShopPage);