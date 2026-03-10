import React, { useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { Typography, Paper, Fade } from "@mui/material";
import CardView from "./CardView";
import TableView from "./TableView";
import BadMood from "@mui/icons-material/MoodBad";

const PER_PAGE = 9;

const CocktailList = ({ browserMode, cocktails = [] }) => {
  const [page, setPage] = useState(0);

  const displayedCocktails = cocktails.slice(0, PER_PAGE + page * PER_PAGE);
  const View = browserMode === "card" ? CardView : TableView;
  return (
    <div>
      <div style={{ padding: 8 }}>
        {displayedCocktails.length > 0 && (
          <Fade in={displayedCocktails.length > 0}>
            <InfiniteScroll
              loadMore={setPage}
              hasMore={displayedCocktails.length < cocktails.length}
            >
              <View displayedCocktails={displayedCocktails} />
            </InfiniteScroll>
          </Fade>
        )}

        {!cocktails.length && (
          <Paper sx={{ textAlign: "center", p: 1 }}>
            <BadMood sx={{ fontSize: "10rem" }} />
            <Typography gutterBottom>No results</Typography>
          </Paper>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  browserMode: state.settings.browserMode,
});

export default connect(mapStateToProps)(CocktailList);
