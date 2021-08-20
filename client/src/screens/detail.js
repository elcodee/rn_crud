import React, { useState } from "react";
import {
  HamburgerIcon,
  Pressable,
  Heading,
  Center,
  HStack,
  VStack,
  Box,
  Stack,
  IconButton,
  Icon,
  Button,
  Modal,
  TextArea,
  useToast,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { API } from "../config/api";
import MainStyle from "../style/main";
import { TextInput } from "react-native-gesture-handler";

export default function Detail(props) {
  const [detailMemo, setdDetailmemo] = useState(props.route.params);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  const updateMemo = async () => {
    try {
      setIsLoading(true);
      let response = await API.patch(
        `/memo/update/${detailMemo.id}`,
        detailMemo
      );
      setdDetailmemo(response.data.data);
      toast.show({
        render: () => {
          return (
            <Box bg="cyan.500" px={4} py={3} rounded="md" mb={5}>
              Memo Updated
            </Box>
          );
        },
      });
      setIsLoading(false);
      props.navigation.reset({
        index: 0,
        routes: [{ name: "MyMemo" }],
      });
    } catch (error) {
      console.error("ERR UPDATE!", error);
    }
  };

  const deleteMemo = () => {
    setIsLoading(true);
    API.delete(`/memo/delete/${detailMemo.id}`)
      .then(
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
                Memo Deleted
              </Box>
            );
          },
        })
      )
      .then(setIsLoading(false))
      .then(
        props.navigation.reset({
          index: 0,
          routes: [{ name: "MyMemo" }],
        })
      )
      .catch((error) => {
        setIsLoading(true);
        console.error("ERR DELETE!", error);
      });
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
            {detailMemo.title}
          </Heading>
        </Center>
        <HStack space={1}>
          <IconButton
            icon={
              <Icon
                onPress={() => setModalVisible(true)}
                as={<MaterialIcons name="delete" />}
                size="sm"
                color="black"
              />
            }
          />

          <Modal isOpen={modalVisible} onClose={setModalVisible} size={"lg"}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Delete {detailMemo.title} ?</Modal.Header>
              <Modal.Footer>
                <Button.Group variant="ghost" space={2}>
                  <Button onPress={deleteMemo}>DELETE</Button>
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    colorScheme="muted"
                  >
                    CLOSE
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </HStack>
      </HStack>

      <VStack flex={1}>
        <Center>
          <Box bg="white" shadow={2} rounded="xl" width="95%" height="90%">
            <Stack space={10} p={[2, 2, 4]}>
              <TextInput
                value={detailMemo.title}
                onChangeText={(val) =>
                  setdDetailmemo({ ...detailMemo, title: val })
                }
                style={MainStyle.inputTitle}
                placeholder="Title"
                refreshing={isLoading}
              />

              <TextArea
                value={detailMemo.content}
                onChangeText={(val) =>
                  setdDetailmemo({ ...detailMemo, content: val })
                }
                h="91%"
                w="103%"
                m={[-1.5]}
                refreshing={isLoading}
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
            onPress={updateMemo}
            isLoading={false}
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
