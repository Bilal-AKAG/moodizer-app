import { StyleSheet, Text, View, Image } from "react-native";


export default function Index() {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View
          style={{
            padding: 2,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 60, height: 60 }}
          />
        </View>
      </View>
      <View style={style.image}>
        <Image
          source={require("../assets/images/landing.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f4f4",
  },
  image: {
    marginTop: 70,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 4,
    fontFamily: "Inter_900Black",
  },
  textspan: {
    color: "green",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
    gap: 10,
  },
});
