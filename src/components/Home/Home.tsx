import React, { useEffect, useRef, useState } from "react";
import { Flex, Spinner, useTheme, View, Text, Link } from "vcc-ui";
import Image from "next/image";
import { CarObject } from "../../../types/car";
import useCars from "../../hooks/useCars";
import CarouselArrowsRender from "../Carousel/CarouselArrows";
import CarouselDotsRender from "../Carousel/CarouselDots";
import productFilter from "../../utils/productFilter";
import productSearch from "../../utils/productSearch";
import useMediaQuery from "../../hooks/useMediaQuery";
import { SearchFilter } from "../Filters/SearchFilter";
import { Filters } from "../Filters/Filters";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const [elementScrolled, setElementScrolled] = useState<number>(0);
  const [elementWidth, setElementWidth] = useState<number>(500);
  const [cars, setCars] = useState<CarObject[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    setElementScrolled(e.currentTarget?.scrollLeft);
    setElementWidth(
      e.currentTarget?.scrollWidth - e.currentTarget?.clientWidth
    );
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  const { data, status } = useCars();

  useEffect(() => {
    if (data) {
      setCars(
        data
          .filter((car) =>
            productSearch(
              car,
              ["id", "bodyType", "modelName", "modelType"],
              searchQuery,
              false
            )
          )
          .filter((car) =>
            productFilter(
              car,
              ["id", "bodyType", "modelName", "modelType"],
              filterQuery
            )
          )
      );
    }
  }, [data, filterQuery, searchQuery]);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        left: ref.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const scrollToDiv = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const CarsFilters = () => {
    return (
      <div className="wrapper-box">
        <SearchFilter
          setSearchQuery={(searchQuery) => {
            setSearchQuery(searchQuery);
          }}
        />
        <div>
          <Filters
            setFilterQuery={(filterQuery) => {
              setFilterQuery(filterQuery);
            }}
            data={data || []}
          />
        </div>
      </div>
    );
  };

  return (
    <View
      extend={{
        background: theme.color.background.secondary,
        color: theme.color.foreground.primary,
        marginTop: "20px",
      }}
    >
      {CarsFilters()}
      {status === "error" && <p>Something went wrong. Error fetching data</p>}
      {status === "loading" && <Spinner />}
      {status === "success" && (
        <>
          <Flex
            className="scroll-container"
            extend={{
              flexFlow: "row nowrap",
              flexDirection: "row",
              overflow: "scroll",
            }}
            ref={ref}
            id={"ref"}
            onScroll={(e) => handleScroll(e)}
          >
            {cars?.map((car) => (
              <View
                key={car.id}
                id={car.id}
                extend={{
                  flex: "0 0 1",
                  untilL: {
                    width: "90%",
                  },
                  fromL: {
                    width: "25%",
                  },
                }}
              >
                <div aria-hidden="true" style={{ padding: "15px" }}>
                  <Text
                    variant="bates"
                  >
                    {car.bodyType.toUpperCase()}
                  </Text>
                  <View direction={"row"}>
                    <Text
                      subStyle="emphasis"
                      extend={{
                        paddingRight: "10px",
                        color: theme.color.foreground.primary,
                      }}
                    >
                      {car.modelName}
                    </Text>
                    <Text extend={{ color: theme.color.foreground.secondary }}>
                      {car.modelType}
                    </Text>
                  </View>
                  <div style={{ marginTop: "10px" }}>
                    <Image
                      className="cars"
                      src={car.imageUrl}
                      alt={car.modelName}
                      width="100%"
                      height="75%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                  <Flex
                    extend={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      padding: "10px",
                    }}
                  >
                    <Link href={`/learn/${car.id}`} arrow="right">
                      Learn
                    </Link>
                    <Link href={`/shop/${car.id}`} arrow="right">
                      Shop
                    </Link>
                  </Flex>
                </div>
              </View>
            ))}
          </Flex>
           {!isMobile && (
          <CarouselArrowsRender
            elementScrolled={elementScrolled}
            elementWidth={elementWidth}
            length={cars.length}
            scroll={scroll}
          ></CarouselArrowsRender>
           )}
          {isMobile && (
            <CarouselDotsRender
              elementScrolled={elementScrolled}
              elementWidth={elementWidth}
              cars={cars}
              scrollToDiv={scrollToDiv}
            />
          )}
        </>
      )}
    </View>
  );
};

export default HomePage;
