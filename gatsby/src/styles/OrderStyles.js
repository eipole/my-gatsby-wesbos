import styled from "styled-components"
const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    gap: 1rem;
    align-content: start;
    &.order,
    &.meny {
      grid-column: span 1;
    }
  }
  .mapleSyrup {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.meny,
    fieldset.order {
      grid-column: span 2;
    }
  }
`
export default OrderStyles
