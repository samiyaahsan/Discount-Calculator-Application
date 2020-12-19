import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Modal, FlatList, TouchableOpacity, TextInput } from 'react-native';


const App = () => {
  const [originalPrice, setOriginalPrice] = useState ("");
  const [ discPercent, setDiscPercent ] = useState(" ");
  const [ finalPrice, setFinalPrice ] = useState ("0.00");
  const [ savedAmount, setSavedAmount ] = useState( "0.00" );
  const [ history, setHistory ] = useState ([" "]);
  const [ modalVisible, setModalVisible ] =useState (false);
  const [ err, setErr ] = useState ([ " "])
  
  const calcDiscount = () => {
    if (discPercent <= 100 && originalPrice >= 0 && discPercent >= 0){
      var savAmount = ( originalPrice * discPercent ) / 100;
      var final_Price = originalPrice - savAmount;
      setSavedAmount(savAmount.toFixed(2));
      setFinalPrice(final_Price.toFixed(2));
      
    }
    else if (discPercent > 100){
      setErr("Discount can not be greater than 100")
    }
    else if (originalPrice < 0){
      setErr("Original Price is less than zero.")
    }
  }

  const viewHistory = () => {
    setModalVisible(true);
  }

  const savResult = () => {
    var result = "Rs " + originalPrice + " | " +discPercent + "% " + " | " + "Rs " +finalPrice;
    console.log(result);
    setHistory(oldHistory => [...history, result]);

    setOriginalPrice("");
    setDiscPercent("");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discount Calculator</Text>
      </View>
      <View styles= {styles.main}>
      <TextInput keyboardType={"number-pad"}
      value= {originalPrice}
      onChangeText={(orgPrice) => setOriginalPrice(orgPrice)}
      placeholder={"Price"}
      style={styles.textFields} />
      <View style={{ paddingTop: 10 }}/>
      <TextInput keyboardType={"number-pad"}
      value = {discPercent}
      onChangeText = {(discPercent) => setDiscPercent(discPercent)}
      placeholder={"Discount %"}
      style={styles.textFields} />
      <View style={{paddingTop: 10}}/>
            
      <View style={{ paddingTop: 20}}/>
      <TouchableOpacity onPress={() => calcDiscount()} style={styles.calcButton}>
          <Text style={styles.calcButtonText}>Calculate Discount</Text>
      </TouchableOpacity>
      <View style={{ paddingTop: 10 }} />
      <Text style={{ fontSize: 17, color: "#ff7f50"}}></Text>
      <View style= {{paddingTop: 10 }}/>
      <View style={{ flexDirection: 'row' }}>
      <Text style={styles.resultText}>Final Price: </Text>
      <Text style={styles.finalPriceText}>Rs {finalPrice} </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.resultText}>Money Saved: </Text>
        <Text style={styles.finalPriceText}>Rs {savedAmount}</Text>
      </View>
      <View style={{paddindTop: 15 }} />
      <TouchableOpacity onPress={() => savResult()} style={styles.saveButton}>
      <Text style={styles.saveButtonText}>Save Result</Text>
      </TouchableOpacity>
      <View style= {{paddingTop: 10}}/>
      <TouchableOpacity onPress={() => viewHistory()} style={styles.historyButton}>
      <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
      <Modal 
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {alert("Closed");
      }}>
      <View style={styles.centerView}>
      <View style={styles.modalView}>
      <Text style={styles.modalheading}>Discount History</Text>
      <Text style={styles.historyHeadingText}> Price | Discount % | New Price </Text>
      <FlatList
      data={history}
      renderItem={({ item }) => { return <Text style={styles.listTextItem}>{item}</Text> }}
                keyExtractor={(index) => { return index }} />
                <TouchableOpacity
                style={{ ...styles.closeHistory, backgroundColor: "#5f9ea0",borderRadius: 10,elevation: 3 , color: 'white'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
  <Text style={styles.textStyle}>Close</Text>
  </TouchableOpacity>
       </View>  
      </View>
      </Modal>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  header: {
    paddingTop: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'

  },
  headerText:{
    fontSize: 24,
    color: '#5f9ea0'
  },
  
  calcButton: {
    height: 50,
    width: 200,
    backgroundColor: '#5f9ea0',
    borderRadius: 10,
    elevation: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  calcButtonText:{
    fontSize: 20,
    color: 'white'
  },
  finalPriceText: {
    fontSize: 18,
    paddingLeft: 23,
    color: '#808080'
  },
  resultText: {
    fontSize: 18,
    color: '#5f9ea0'
  },

  saveButton:{
    height: 35,
    width: 150,
    backgroundColor: '#5f9ea0',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText:{
    fontSize: 18,
    color: 'white'
  },
  textFields: {
    height: 50,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  historyButton:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButtonText:{
    fontSize: 18,
    color: '#5f9ea0'
  },
  modalView:{
    margin: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 15,
    paddingRight: 15,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  },
  modalheading:{
    fontSize: 24,
    color: '#5f9ea0',
    paddingBottom: 10
  },
  textStyle:{
    paddingTop: 5,
    fontSize: 18,
    color: 'white',
    paddingBottom: 10
  },
  historyHeadingText:{
    fontSize: 18,
    color: '#5f9ea0'
  },
  listTextItem:{
    color: 'black',
    paddingBottom: 10
  }
});
export default App;
