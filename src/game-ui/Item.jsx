import styled from "styled-components";

import {getIcon} from "./Inventory";
import {GiBullets, GiMachineGunMagazine} from "react-icons/gi";

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
    border-radius: 5px;
  }

  & small {
    padding: 0.2rem;
    font-family: "Gluten", sans-serif;
    flex-grow: 1;

    display: flex;
    justify-content: space-between;
  }

  & small span {
    display: flex;
    gap: 0.1rem;
    align-items: center;
    padding: 0 0.2rem;
    border-right: 2px solid var(--light-theme);
  }

  & small span:last-child {
    border-right: none;
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
            <small>
              <span>x{item.quantity}</span>
              {item?.ammunition !== undefined && (
                <>
                  <span>
                    <GiMachineGunMagazine /> {item.ammoLoad}
                  </span>{" "}
                  <span>
                    <GiBullets /> {item.ammunition}
                  </span>
                </>
              )}
            </small>
          </div>
        </ItemText>
      </ItemInfo>
      <ItemActions>{children}</ItemActions>
    </StyledItem>
  );
}

export default Item;
