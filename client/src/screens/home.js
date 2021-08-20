import React, { useState, useEffect } from "react";
import {
  HamburgerIcon,
  Pressable,
  Heading,
  Center,
  HStack,
  VStack,
  Text,
  NativeBaseProvider,
  Box,
  Stack,
} from "native-base";
import { FlatList } from "react-native";
import { API } from "../config/api";

export default function Home(props) {
  const [memo, setMemo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMemo = async () => {
    try {
      setIsLoading(true);
      let response = await API.get("/memos");
      setMemo(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log("ERR GET: ", error);
    }
  };

  useEffect(() => {
    getMemo();
    setIsLoading(false);
  }, [memo]);

  const RenderCard = ({ item }) => {
    const date = new Date(item.createdAt).toLocaleDateString("id-ID");
    const time = new Date(item.createdAt).toLocaleTimeString("id-ID");
    return (
      <NativeBaseProvider>
        <Pressable
          onPress={() => props.navigation.navigate("DetailMemo", item)}
        >
          <Center flex={1}>
            <Box bg="white" shadow={2} rounded="xl" mb={6} maxWidth="70%">
              <Stack space={4} p={[4, 4, 8]}>
                <Heading size={["lg"]} noOfLines={2}>
                  {item.title}
                </Heading>
                <Text lineHeight={[4, 5, 7]} noOfLines={1} color="gray.700">
                  {item.content}
                </Text>
                <Text color="gray.400">
                  Last Update: {date} {"-"} {time}
                </Text>
              </Stack>
            </Box>
          </Center>
        </Pressable>
      </NativeBaseProvider>
    );
  };

  return (
    <>
      <HStack alignItems="center" mt={6}>
        <Pressable
          onPress={() => props.navigation.toggleDrawer()}
          position="absolute"
          ml={2}
          zIndex={1}
        >
          <HamburgerIcon ml={2} size="sm" />
        </Pressable>
        <Center flex={1}>
          <Heading size="md">My Memo</Heading>
        </Center>
      </HStack>

      <VStack flex={1} mt={8}>
        <FlatList
          data={memo}
          renderItem={RenderCard}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={getMemo}
        />
      </VStack>
    </>
  );
}
