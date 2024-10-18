import React from "react";
import { Flex } from "vcc-ui";
import { CarObject } from "../../../types/car";

const CarouselDots = (props: {
  cars: CarObject[];
  elementWidth: number;
  scrollToDiv: (arg0: number) => void;
  elementScrolled: number;
}) => (
  <Flex
    className="scroll-arrows"
    extend={{
      flexDirection: "row",
      justifyContent: "center",
      onlyL: {
        display: "none",
      },
    }}
  >
    {props.cars.map((car, index) => {
      const elementSize = props.elementWidth / props.cars.length;
      return (
        <span
          onClick={(e) => {
            e.preventDefault();
            props.scrollToDiv(
              index * document.getElementById(car.id)!.scrollWidth
            );
          }}
          key={car.id + car.modelName}
          className={`dot ${
            props.elementScrolled >= index * elementSize &&
            (index + 1) * elementSize >= props.elementScrolled &&
            "active"
          } `}
        ></span>
      );
    })}
  </Flex>
);

export default CarouselDots;
