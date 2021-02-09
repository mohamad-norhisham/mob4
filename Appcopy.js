import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
const BUS_NUMBER = "155";
const BUSSTOP_NUMBER = "83139";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //console.log(responseData)
      const myBus = responseData.services.filter(
        (item) => item.no === BUS_NUMBER
      )[0];
      console.log(myBus);
  setArrival(myBus.next.time);
  setLoading(false);
});
}


useEffect(() => {
  const interval = setInterval(loadBusStopData, 5000);

  return () => clearInterval(interval);
}, []);

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Bus arrival time:</Text>
     <Text style={styles.arrivalTime}>
       {loading ? <ActivityIndicator size="large" color="#aa8" /> : arrival}
     </Text>
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Refresh!</Text>
     </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 title: {
   fontWeight: "bold",
   fontSize: 32,
   marginBottom: 24,
 },
 arrivalTime: {
   fontSize: 50,
   marginBottom: 32,
 },
 button: {
   padding: 20,
   backgroundColor: "blue",
   borderRadius: 30,
 },
 buttonText: {
   fontSize: 32,
   fontWeight: "bold",
   color: "white",
   justifyContent: "center",
   textAlign: "center",
 },
});


