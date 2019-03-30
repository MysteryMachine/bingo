import _ from "lodash";
import { useState } from "react";
import { Map } from "immutable";

const ItemStyle = (
  <style jsx>{`
    .item {
      width: 50px;
      height: 50px;
    }
  `}</style>
);

function Item() {
  const [color, updateColor] = useState(0);
  return (
    <div
      className="item"
      onClick={() => updateColor((color + 1) % 10)}
      style={{ backgroundColor: `#${color}${color}${color}` }}
    >
      {ItemStyle}
    </div>
  );
}

const PageStyle = (
  <style jsx>{`
    .list {
      display: flex;
    }
  `}</style>
);

export default function Page() {
  const [num, updateNum] = useState(0);
  return (
    <div>
      <div className="buttonRow">
        <button onClick={() => updateNum(num ? num - 1 : num)}> - </button>
        <button onClick={() => updateNum(num + 1)}> + </button>
      </div>
      <div className="list">
        {_.range(0, num).map(i => (
          <Item key={i} />
        ))}
        {PageStyle}
      </div>
    </div>
  );
}
