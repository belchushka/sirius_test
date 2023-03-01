import React, {useState} from 'react';
import {Chips} from "@/shared/ui/chips";

const Home = () => {
  const [selectedChip, setSelectedChip] = useState<null | number>(null)
  const [selectedSingleChip, setSelectedSingleChip] = useState<boolean>(false)
  return (
      <div className="wrapper">
        <h1>Multi chip component</h1>
        <div>
          <Chips>
            {new Array(10).fill(0).map((el, num) => {
              const title = `Chip ${num}`
              return <Chips.Chip selected={selectedChip === num}
                                 onChange={(val) => val ? setSelectedChip(num) : setSelectedChip(null)} key={num}>
                {title}
              </Chips.Chip>
            })}
          </Chips>
        </div>
        <h2>Single chip component</h2>
        <div>
          <Chips.Chip selected={selectedSingleChip} onChange={setSelectedSingleChip}>
            Hello im single chip
          </Chips.Chip>
        </div>
      </div>
  );
};

export default Home;
