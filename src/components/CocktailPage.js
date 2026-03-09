import React from "react";
import useScrollTop from "../hooks/useScrollTop";
import useEnrichCocktail from "../hooks/useEnrichCocktail";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Fade, Box, Grid } from "@mui/material";
import CocktailDetail from "./CocktailPage/CocktailDetail";
import CocktailVariantList from "./CocktailPage/CocktailVariantList";

const fullHeight = "92vh";

export const CocktailPage = ({ allCocktails }) => {
  const { slug } = useParams();
  const cocktail = allCocktails.find((c) => c.slug === slug);
  useScrollTop();
  useEnrichCocktail(cocktail);

  if (!cocktail) return <span>Cocktail not found</span>;

  const image = cocktail.enrichment && cocktail.enrichment.image;

  return (
    <>
      <Fade in={!!image}>
        <Box
          component="div"
          sx={{
            height: "20vh",
            backgroundPosition: "center",
            display: { xs: "block", md: "none" },
          }}
          style={image && { backgroundImage: `url(${image})` }}
        />
      </Fade>
      <Grid container>
        <Grid
          sx={{
            overflow: "auto",
            height: { sm: fullHeight },
          }}
          item
          md={6}
          xs={12}
        >
          <div style={{ padding: 16 }}>
            <CocktailDetail cocktail={cocktail} />
            <CocktailVariantList cocktail={cocktail} />
          </div>
        </Grid>
        <Grid item md={6} xs={false}>
          <Fade in={!!image}>
            <Box
              style={
                image && {
                  backgroundImage: `url(${image})`,
                }
              }
              sx={(theme) => ({
                ...theme.mixins.toolbar,
                backgroundColor: theme.palette.grey[400],
                backgroundRepeatY: "no-repeat",
                backgroundSize: "cover",
                height: { xs: fullHeight },
              })}
            />
          </Fade>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  allCocktails: state.db.cocktails,
});

export default connect(mapStateToProps)(CocktailPage);
