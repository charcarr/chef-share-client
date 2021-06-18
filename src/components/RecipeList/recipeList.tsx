import React from "react";
import Recipe from "../Recipe/recipe";

interface recipeNote {
  id: string;
  text: string;
}

interface recipe {
  id: string;
  name: string;
  keywords: string[];
  image: string;
  recipeYield: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  publisher: string;
  author: string;
  url: string;
  notes: recipeNote[];
  origin: string;
}

interface Props {
  recipeStore: recipe[];
  viewAsSelf: boolean;
}

const RecipeList = ({ recipeStore, viewAsSelf}: Props) => {

  return (
    <>
      {recipeStore.length
        ? recipeStore.map((recipe: recipe) =>
            viewAsSelf ? (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                remove={true}
                edit={true}
                save={false}
                self={true}
              />
            ) : (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                remove={false}
                edit={false}
                save={true}
                self={false}
              />
            )
          )
        : null}
    </>
  );
};

export default RecipeList;
