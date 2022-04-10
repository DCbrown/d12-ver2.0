import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  IconButton,
  Colors,
  FAB,
} from "react-native-paper";
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { List } from "react-native-paper";
import { Divider } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";
import { ProgressBar } from 'react-native-paper';
import { SvgUri } from "react-native-svg";
import { D8light } from "./img/D8light.svg";

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [modifier, setModifier] = React.useState(0);
  const [dR, setDR] = useState(0);
  const [logs, setLogs] = useState([]);

  const showModal = () => { 
    setVisible(true); 
    setModifier(0)
  }
  const hideModal = () => {
    setVisible(false);
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000000',
      accent: '#f1c40f',
    },
  };

  const roll = (d) => {
    let rand = Math.floor(Math.random() * d) + 1;
    setDR(rand);
    let add = rand + Number(modifier);
    console.log(add);
    let log = `${rand} + ${modifier} = ${add}` 
    setLogs((prev) => {
      return [...prev, log];
    });
    hideModal();
  };

  const removeItem = (index) => {
    setLogs(logs.filter((o, i) => index !== i));
  };

  /*
  const rollingDice = () => {
    console.log('Dice Roll', dR)
    
    let log = `${dR} + ${modifier} = ${dR + modifier}`


    setLogs(logs.concat(log))
  
  }
  */

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Appbar.Header>
          <Appbar.Content title="D12" />
          <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>

        <Modal
          style={styles.modal}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.modifierWrapper}>
            <TextInput
              mode="outlined"
              label="Add Modifier"
              style={styles.input}
              value={modifier.toString().replace(/^0+/, '')}
              keyboardType={"phone-pad"}
              onChangeText={(modifier) => setModifier(modifier)}
            />
          </View>
          <View style={styles.container}>
            {/*
          <SvgUri style={styles.button} 
              width="20%"
              height="20%"
              uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
          />

          <List.Item
              key={ index }
              titleStyle = {{textAlign: 'right' }}
              title={`${log.name}`}
              left={props => <List.Icon {...props} icon="folder" />}
            />
          */}
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(4)}
            >D4</Button>
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(6)}
            >D6</Button>
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(8)}
            >D8</Button>
          </View>
          <View style={styles.container}>
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(10)}
            >D10</Button>
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(12)}
            >D12</Button>
            <Button
              style={styles.button}
              icon="cube"
              mode="contained"
              onPress={() => roll(20)}
            >D20</Button>
          </View>
          
        </Modal>
      </Portal>

      {    
      /*<Text style={{paddingTop: 100}}>{modifier}</Text>
      <Text>{dR}</Text> */
      }
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View>
            {logs < 1 ? null : <Text style={{textAlign: 'center', paddingTop: 75}}>Hold down dice roll for 2 seconds to remove from log</Text> }
            {logs < 1 ? null : <Divider style={{marginTop: 20}} />}
            {logs
              ? logs.map((log, index) => {
                  return (
                    <View key={index}>
                    <TouchableOpacity 
                      onLongPress={() => {
                        removeItem(index)
                      }}
                      delayLongPress={2000} >
                      <List.Item
                        titleStyle={{ textAlign: "right" }}
                        title={`${log}`}
                        left={(props) => <List.Icon {...props} icon="folder" /> }
                      />
                      </TouchableOpacity> 
                      <Divider />
                    </View>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FAB
        style={styles.fab}
        small
        icon="cube"
        label="Roll Dice"
        onPress={showModal}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 20
  },
  button: {
    width: 60,
    height: 60,
    margin: 20,
  },
  modifierWrapper: {
    paddingLeft: 20
  },
  input: {
    width: "80%",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
