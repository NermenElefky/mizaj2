import React, { useContext, useState } from "react";
import { MizajStore } from "./components/Context";
import NotFound from "./components/NotFound";
import FavoritesComp from "./components/FavoritesComp";

function Favorites() {
  const [toMakeRender, setToMakeRender] = useState(false);
  const { userEmail } = useContext(MizajStore);

  // we can't use context because if there is updating and doesn't lead to re-render
  // context  no changes will happen
  let data = JSON.parse(localStorage.getItem("users"));

  // // find the correct user
  let user = data && data.find((item) => item.email === userEmail);

  return (
    <>
      {user.favorites.length === 0 ? (
        <NotFound />
      ) : (
        <FavoritesComp
          user={user}
          data={data}
          setToMakeRender={setToMakeRender}
          toMakeRender={toMakeRender}
        />
      )}
    </>
  );
}

export default Favorites;
