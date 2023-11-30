import styled from "styled-components";

import {getIcon} from "./Inventory";

const StyledItem = styled.li`
  background-color: var(--light-theme);
  color: #333;
  border: 1px solid #ddd;
  padding: 1rem 2.4rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.6rem;
`;

const ItemIcon = styled.div`
  font-size: 2.4rem;
  color: var(--light-theme);
  height: 3.6rem;
  width: 3.6rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  background-color: var(--medium-theme);
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    background-color: var(--medium-theme);
    width: fit-content;
    color: var(--light-theme);
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

function Item({item, children}) {
  return (
    <StyledItem>
      <ItemInfo>
        <ItemIcon>{getIcon(item)}</ItemIcon>
        <ItemText>
          {item.name}
          <div>
            <small>x{item.quantity}</small>{" "}
            {item?.ammunition !== undefined && (
              <small>
                x{item.ammoLoad} Loaded | x{item.ammunition} Ammo
              </small>
            )}
          </div>
        </ItemText>
      </ItemInfo>
      <ItemActions>{children}</ItemActions>
    </StyledItem>
  );
}

export default Item;
