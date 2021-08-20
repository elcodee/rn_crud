import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
} from "native-base";
import Home from "./src/screens/home";
import Detail from "./src/screens/detail";
import CreateMemo from "./src/screens/create";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "MyMemo":
      return "book";
    case "CreateMemo":
      return "plus";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700" fontSize="4xl">
            Memo
          </Text>
        </Box>
        <VStack divider={<Divider />} space={4}>
          <VStack space={3}>
            {props.state.routeNames.map((name, index) => {
              return (
                <Pressable
                  key={index}
                  px={5}
                  py={3}
                  rounded="md"
                  bg={
                    index === props.state.index
                      ? "rgba(6, 182, 212, 0.1)"
                      : "transparent"
                  }
                  onPress={(event) => {
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: name }],
                    });
                  }}
                >
                  <HStack space={7} alignItems="center">
                    <Icon
                      color={
                        index === props.state.index ? "primary.500" : "gray.500"
                      }
                      size={5}
                      as={<MaterialCommunityIcons name={getIcon(name)} />}
                    />
                    <Text
                      fontWeight={500}
                      color={
                        index === props.state.index ? "primary.500" : "gray.700"
                      }
                    >
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
export default function App() {
  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider>
          <Box safeArea flex={1}>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
              <Drawer.Screen name="MyMemo" component={Home} />
              <Drawer.Screen name="CreateMemo" component={CreateMemo} />
              <Drawer.Screen name="DetailMemo" component={Detail} />
            </Drawer.Navigator>
          </Box>
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
}
