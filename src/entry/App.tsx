import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dumbbell from "../assets/icons/Dumbbell";
import Home from "../assets/icons/Home";
import Profile from "../assets/icons/Profile";
import Calendar from "../assets/icons/Calendar";

import HomeScreen from "../screens/Home";
import TrainingsScreen from "../screens/Trainings";
import TrainingDetailsScreen from "../screens/TrainingDetails";
import ActiveTrainingScreen from "../screens/ActiveTraining";
import ProgramsScreen from "../screens/Programs";
import ProgramDetailsScreen from "../screens/ProgramDetails";
import ExercisesScreen from "../screens/Exercises";
import DiaryScreen from "../screens/Diary";
import MyTrainingsScreen from "../screens/MyTrainings";
import MyProgramsScreen from "../screens/MyPrograms";
import MyExercisesScreen from "../screens/MyExercises";
import CalendarScreen from "../screens/Calendar";
import ProfileScreen from "../screens/Profile";
import EditProfileScreen from "../screens/EditProfile";
import AuthScreen from "../screens/Auth";

import ROUTES from "./routes";
import ExerciseDetailsScreen from "../screens/ExerciseDetails";
import CompleteTrainingScreen from "../screens/CompleteTraining";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.TRAINIGS}
        component={TrainingsScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.PROGRAMS}
        component={ProgramsScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.EXERCISES}
        component={ExercisesScreen}
        options={{
          header: () => null,
        }}
      />
    </HomeStack.Navigator>
  );
}

const DiaryStack = createStackNavigator();

function DiaryStackScreen() {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen
        name={ROUTES.DIARY}
        component={DiaryScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.MY_TRAINIGS}
        component={MyTrainingsScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.MY_PROGRAMS}
        component={MyProgramsScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name={ROUTES.MY_EXERCISES}
        component={MyExercisesScreen}
        options={{
          header: () => null,
        }}
      />
    </DiaryStack.Navigator>
  );
}

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name={ROUTES.CALENDAR}
        component={CalendarScreen}
        options={{
          header: () => null,
        }}
      />
    </CalendarStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          header: () => null,
        }}
      />
      <ProfileStack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          header: () => null,
        }}
      />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabsStackScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#c1c5d0",
        activeBackgroundColor: "#202022",
        inactiveBackgroundColor: "#202022",
        style: {
          backgroundColor: "#202022",
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: "Главная",
          tabBarIcon: ({ focused }) => (
            <Home color={focused ? "#fff" : "#c1c5d0"} />
          ),
        }}
      />
      <Tab.Screen
        name="DiaryStack"
        component={DiaryStackScreen}
        options={{
          title: "Дневник",
          tabBarIcon: ({ focused }) => (
            <Dumbbell color={focused ? "#fff" : "#c1c5d0"} />
          ),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={CalendarStackScreen}
        options={{
          title: "Календарь",
          tabBarIcon: ({ focused }) => (
            <Calendar color={focused ? "#fff" : "#c1c5d0"} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <Profile color={focused ? "#fff" : "#c1c5d0"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

const App = () => {
  const [isSignedIn, setSignedIn] = useState<boolean | undefined>();

  useEffect(() => {
    async function fetchData() {
      const isSignedIn = await AsyncStorage.getItem("IS_SIGNED_IN");
      setSignedIn(!!isSignedIn);
    }
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn !== undefined &&
        (isSignedIn ? (
          <RootStack.Navigator>
            <RootStack.Screen
              name={ROUTES.TABS}
              component={TabsStackScreen}
              options={{
                header: () => null,
              }}
            />
            <RootStack.Screen
              name={ROUTES.TRAINING_DETAILS}
              component={TrainingDetailsScreen}
              options={{
                header: () => null,
              }}
            />
            <RootStack.Screen
              name={ROUTES.ACTIVE_TRAINING}
              component={ActiveTrainingScreen}
              options={{
                header: () => null,
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name={ROUTES.COMPLETE_TRAINING}
              component={CompleteTrainingScreen}
              options={{
                header: () => null,
                gestureEnabled: false,
              }}
            />
            <RootStack.Screen
              name={ROUTES.EXERCISE_DETAILS}
              component={ExerciseDetailsScreen}
              options={{
                header: () => null,
              }}
            />
            <RootStack.Screen
              name={ROUTES.PROGRAM_DETAILS}
              component={ProgramDetailsScreen}
              options={{
                header: () => null,
              }}
            />
          </RootStack.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name={ROUTES.AUTH}
              component={AuthScreen}
              options={{
                header: () => null,
              }}
            />
          </AuthStack.Navigator>
        ))}
    </NavigationContainer>
  );
};

export default App;
