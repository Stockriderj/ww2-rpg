import styled from "styled-components";

const Progress = styled.div`
  width: 100%;
  background: ${props => (props?.background ? props.background : "#eee")};
  border-radius: 20px;
  overflow: hidden;

  & div {
    height: 1.2rem;
    background: ${props => (props?.fill ? props.fill : "#4caf50")};
    width: ${({value, max}) => (value / max) * 100}%;

    transition: width 0.2s;
  }
`;

/**
 *
 * @param {string} color
 * @param {number} value
 * @param {number} max
 *
 * @returns a progress bar
 */
export default function ProgressBar({...props}) {
  return (
    <Progress {...props}>
      <div></div>
    </Progress>
  );
}
