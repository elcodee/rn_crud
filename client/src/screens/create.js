import React, { useState, useEffect } from "react";
import {
  HamburgerIcon,
  Pressable,
  Heading,
  Center,
  HStack,
  VStack,
  Box,
  Stack,
  Icon,
  Button,
  TextArea,
  useToast,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import MainStyle from "../style/main";
import { API } from "../config/api";

export default function CreateMemo(props) {
  const [newMemo, setNewmemo] = useState({
    title: null,
    content: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputTitle = (value) => {
    setNewmemo({
      ...newMemo,
      title: value,
    });
  };
  const handleInputContent = (value) => {
    setNewmemo({
      ...newMemo,
      content: value,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    await API.post("/memo/create", newMemo, {
      "Content-Type": "application/json",
    })
      .then(
        setNewmemo({
          title: null,
          content: null,
        })
      )
      .then(setIsLoading(false))
      .then(
        toast.show({
          render: () => {
            return (
              <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
                Memo Created
              </Box>
            );
          },
        })
      )
      .then(props.navigation.navigate("MyMemo"));
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
          <Heading size="md" ml={8}>
            Create New Memo
          </Heading>
        </Center>
      </HStack>

      <VStack flex={1}>
        <Center>
          <Box bg="white" shadow={2} rounded="xl" width="95%" height="90%">
            <Stack space={10} p={[2, 2, 4]}>
              <TextInput
                value={newMemo.title}
                onChangeText={handleInputTitle}
                style={MainStyle.inputTitle}
                placeholder="Title"
              />

              <TextArea
                value={newMemo.content}
                onChangeText={handleInputContent}
                h="91%"
                w="103%"
                m={[-1.5]}
              />
            </Stack>
          </Box>
        </Center>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          space={2}
          m={[2, 2]}
          mb={4}
        >
          <Button
            onPress={handleSave}
            startIcon={
              <Icon as={MaterialCommunityIcons} name="content-save" size={5} />
            }
          >
            Save
          </Button>
        </Stack>
      </VStack>
    </>
  );
}
