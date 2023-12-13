import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { Cast } from "../components/Cast";
import { MovieList } from "../components/MovieList";
import { Loading } from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../services/api";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export function Movie() {
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<any>();

  const route = useRoute();
  const item = route.params;

  const navigation = useNavigation();

  async function getMoviesDetails(id: any) {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  }

  async function getMoviesCredits(id: any) {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  }

  async function getSimilarMovies(id: any) {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  }

  useEffect(() => {
    //@ts-ignore
    getMoviesDetails(item.id);
    //@ts-ignore
    getMoviesCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full mt-9 ">
        <SafeAreaView
          className={
            "w-full mb-3  flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartIcon size="35" color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require('../assets/images/moviePoster2.png')}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              resizeMode="contain"
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.lenght;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}

          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      <Cast navigationCast={navigation} cast={cast} />
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
