import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { Loading } from "./Loading";
import { fallbackMoviePoster, image185 } from "../services/api";

interface MovieListProps {
  title: string;
  data: any;
  hideSeeAll?: any;
}

let { width, height } = Dimensions.get("window");

export function MovieList({ title, data, hideSeeAll }: MovieListProps) {
  let nomeDoFilme = "Ant-Man and the Wasp: Quantumania";

  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-white text-lg">Ver todos</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index} //@ts-ignore
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
