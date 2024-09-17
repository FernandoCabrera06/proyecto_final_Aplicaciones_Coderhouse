import { StyleSheet } from "react-native"
import ShopStack from "./ShopStack"
import CartStack from "./CartStack"
import OrdersStack from "./OrdersStack"
import { colors } from "../global/colors"
import TabBarIcon from "../components/TabBarIcon"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProfileStack from "./ProfileStack"

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              text="Tienda"
              icon="shop"
              color={focused ? colors.primary : colors.textSecondary}
              fontFamily={"OpenSansRegular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              text="Carrito"
              icon="shopping-cart"
              color={focused ? colors.primary : colors.textSecondary}
              fontFamily={"OpenSansRegular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersStack"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              text="Ordenes"
              icon="list"
              color={focused ? colors.primary : colors.textSecondary}
              fontFamily={"OpenSansRegular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              text="Perfil"
              icon="user"
              color={focused ? colors.primary : colors.textSecondary}
              fontFamily={"OpenSansRegular"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    height: 80,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
})
