import React, { memo } from "react";
import { useTheme, View, Text } from "vcc-ui";
import { useRouter } from "next/router";
import Image from "next/image";
import useCars from "../../hooks/useCars";
import productFilter from "../../utils/productFilter";

const Learn = () => {
  const theme = useTheme();

  const router = useRouter();
  const { id } = router.query;

  const { data } = useCars();

  return (
    <View
    className="scroll-container"
      extend={{
        color: theme.color.foreground.primary,
        marginTop: "20px",
      }}
    >
      <Text extend={{ color: theme.color.foreground.primary }}>{id}</Text>
      {data
        ?.filter((car) => productFilter(car, ["id"], id as string))
        .map((car) => (
          <div key={"learn" + car.id}>
            <Text extend={{ color: theme.color.foreground.primary }}>
              {car.bodyType}
            </Text>
            <Text extend={{ color: theme.color.foreground.primary }}>
              {car.modelName}
            </Text>
            <Text extend={{ color: theme.color.foreground.primary }}>
              {car.modelType}
            </Text>
            <div>
              <Image
                src={car.imageUrl}
                alt={car.modelName}
                width="100%"
                height="75%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
    </View>
  );
};

export default memo(Learn);
