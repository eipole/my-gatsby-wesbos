import React from "react"
import S from "@sanity/desk-tool/structure-builder"

export default function Sidebar() {
  return S.list()
    .title(`Slicksisl Slisccess`)
    .items([
      // create new custom item
      S.listItem().title("Home Page").child(
        S.editor()
          .schemaType("storeSettings")
          // make a new document Id instead of random string of numbers
          .documentId("downtown")
      ),
      ...S.documentTypeListItems().filter(
        (elem) => elem.getId() !== "storeSettings"
      ),
    ])
}
