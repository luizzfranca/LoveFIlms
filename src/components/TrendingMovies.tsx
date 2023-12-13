import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { image500 } from "../services/api";

interface TrendingMoviesProps {
  data: any;
}
let { width, height } = Dimensions.get("window");
export function TrendingMovies({ data }: TrendingMoviesProps) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    //@ts-ignore
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
