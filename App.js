import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Share } from 'react-native';
import { TextInput } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import * as Speech from 'expo-speech';

export default function App() {

  const [precoConta, setPrecoConta] = React.useState(0);
  const [totalPessoas, setTotalPessoas] = React.useState(0);
  const [precoFinal, setPrecoFinal] = React.useState(0);

  const alterarPrecoConta = (text) => {
    setPrecoConta(text)
    alterarPrecoFinal(text, totalPessoas)
  }

  const alterarTotalPessoas = (text) => {
    setTotalPessoas(text)
    alterarPrecoFinal(precoConta, text)
  }

  const alterarPrecoFinal = (conta, pessoa) => {

    if(pessoa == null || pessoa == 0)
      setPrecoFinal(0)
    else
      setPrecoFinal((conta / pessoa).toFixed(2));
  }

  const speak = () => {
    var thingToSay = 'O valor de ' + precoConta + ' reais para ' + totalPessoas + ' pessoas vale ' + precoFinal + ' reais.';
    Speech.speak(thingToSay);
  }

  const share = async () => {
    try {
      const result = await Share.share({
        message:
          'O valor de ' + precoConta + ' reais para ' + totalPessoas + ' pessoas vale ' + precoFinal + ' reais.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <View style={styles.container}>
          <Text style={styles.textVamosRachar}>Vamos Rachar!</Text>
          <MaterialCommunityIcons name="cash" size={30} color="black" />
          <TextInput
            style={{ width:200, height: 50, borderColor: 'black', color:'white', textAlign:'center', borderWidth: 1, borderRadius: 100 }}
            onChangeText={text => alterarPrecoConta(text)}
            value={`${precoConta}`} keyboardType='numeric' placeholder="Valor da conta"
          />
          <MaterialIcons name="people" size={30} color="black" />
          <TextInput
            style={{ width:200, height: 50, borderColor: 'black', color:'white', textAlign:'center', borderWidth: 1, borderRadius: 100 }}
            onChangeText={text => alterarTotalPessoas(text)}
            value={`${totalPessoas}`} keyboardType='numeric' placeholder="Quantidade Pessoas"
          />
          <Text style={styles.textPrecoFinal}>R$ {precoFinal}</Text>
          <FontAwesome5 style={styles.share} name="share-alt" size={50} color="white" onPress={share}/>
          <AntDesign style={styles.sound} name="sound" size={50} color="white" onPress={speak}/>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5ACD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVamosRachar:{
    fontSize: 30,
    color: 'white',
    bottom: 90,
    borderRadius: 50,
  },
  textPrecoFinal: {
    fontSize: 30,
    color: 'white', 
    top:20,
  },
  sound: {
    top: 100,
    marginLeft: 200,
  },
  share: {
    top: 150,
    marginRight: 200,
  }

});
