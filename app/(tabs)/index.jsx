import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import IncomeScreen from "./src/modules/Finance/IncomeScreen";
import ExpenseScreen from "./src/modules/Finance/ExpenseScreen";
import ReportScreen from "./src/modules/Finance/ReportScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Income">
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Expense" component={ExpenseScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
