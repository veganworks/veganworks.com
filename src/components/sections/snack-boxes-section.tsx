import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import SnackBoxListing from "../snack-box-listing";
import Section from "../section";

const ProductsWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

type ProductsSectionProps = {};

const ProductsSection: React.FC<ProductsSectionProps> = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allAirtable(
        filter: { table: { eq: "SnackBoxes" }, data: { isLive: { eq: true } } }
      ) {
        edges {
          node {
            data {
              Name
              Availability
              Image {
                url
              }
              Link
              Price
              Sale_Price
            }
          }
        }
      }
    }
  `);

  return (
    <Section title="Our Snack Boxes">
      <ProductsWrapper>
        {data.allAirtable.edges.map(({ node }) => {
          const { data: nodeData } = node;
          return <SnackBoxListing key={node.data.Name} data={nodeData} />;
        })}
      </ProductsWrapper>
    </Section>
  );
};

export default ProductsSection;
