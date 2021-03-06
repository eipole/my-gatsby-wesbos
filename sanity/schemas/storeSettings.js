import { MdStore as icon } from "react-icons/md"
export default {
  name: "storeSettings",
  title: "Settings",
  type: "document",

  icon,
  fields: [
    {
      name: "name",
      title: "Store Name",
      type: "string",
      description: "name of the pizza",
    },
    {
      name: "slicemaster",
      title: "Slicemasters Currently active",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "hotSlices",
      title: "Hot Slices available in the case",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pizza" }] }],
    },
  ],
}
