import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useEffect, useState } from "react";
import { TrendingMovies } from "../components/TrendingMovies";
import { MovieList } from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../services/api";

const ios = Platform.OS == "ios";
export function Home() {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  }

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpComing(data.results);
  }

  async function getTopRatedMovies() {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  }

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">Filmes</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="Em breve" data={upComing} />
          <MovieList title="Melhores filmes" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
