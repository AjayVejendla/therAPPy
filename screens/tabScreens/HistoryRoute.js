// Written by Ushio Shinohara

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from 'react-native';
import { Appbar } from "react-native-paper";
import Modal from 'react-native-modal';
import { Picker, DatePicker } from 'react-native-wheel-pick';

class HistoryRoute extends React.Component {
        // state = {
        // isModalVisible: false,
        // value: 'May 2020'
        // };
        state = {
          data: [
            {id:1, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "3/5/2020", tags:['Admiration', 'Trust', 'Joy','Serenity'], message: 'Ate some icecream'},
            {id:2, color:"#FF3714", icon:"https://i.imgur.com/r1uqWbZ.png", date: "3/4/2020", tags:['Anger', ], message: 'Got corona today'},
            {id:3, color:"#fd7c1a", icon:"https://i.imgur.com/N6d2HMQ.png", date: "3/3/2020", tags:['Annoyance', 'Surprise', 'Boredom',],message: 'Hurt my knee'}, 
            {id:4, color:"#fed41c", icon:"https://i.imgur.com/XD8gBGr.png", date: "3/2/2020", tags:['Acceptance', 'Interest',], message: 'Forgot to do HW'}, 
            {id:5, color:"#a1df39", icon:"https://i.imgur.com/UTUIdBX.png", date: "3/1/2020", tags:['Amazement', 'Joy', 'Serenity','Love'],message: 'Did good on exam'}, 
            {id:6, color:"#fed41c", icon:"https://i.imgur.com/XD8gBGr.png", date: "2/29/2020", tags:['Contempt', 'Sandess',],message: 'Ate some icecream'}, 
            {id:7, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/28/2020", tags:['Love', 'Optimism', 'Joy'],message: 'Ate some icecream'},
            {id:8, color:"#FF3714", icon:"https://i.imgur.com/r1uqWbZ.png", date: "2/27/2020", tags:['Rage', 'Anger', 'Annoyance'],message: 'Ate some burgers'},
            {id:9, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/26/2020", tags:['Joy', 'Optimism', 'Love'],message: 'Ate some icecream'},
            {id:10, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/25/2020", tags:['Admiration', 'Trust', 'Joy','Serenity'], message: 'Ate some icecream'},
            {id:11, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/24/2020", tags:['Admiration', 'Trust', 'Joy','Serenity'], message: 'Ate some icecream'},
            {id:12, color:"#FF3714", icon:"https://i.imgur.com/r1uqWbZ.png", date: "2/23/2020", tags:['Anger', ], message: 'Got corona today'},
            {id:13, color:"#fd7c1a", icon:"https://i.imgur.com/N6d2HMQ.png", date: "2/21/2020", tags:['Annoyance', 'Surprise', 'Boredom',],message: 'Hurt my knee'}, 
            {id:14, color:"#fed41c", icon:"https://i.imgur.com/XD8gBGr.png", date: "2/20/2020", tags:['Acceptance', 'Interest',], message: 'Forgot to do HW'}, 
            {id:15, color:"#a1df39", icon:"https://i.imgur.com/UTUIdBX.png", date: "2/19/2020", tags:['Amazement', 'Joy', 'Serenity','Love'],message: 'Did good on exam'}, 
            {id:16, color:"#fed41c", icon:"https://i.imgur.com/XD8gBGr.png", date: "2/18/2020", tags:['Contempt', 'Sandess',],message: 'Ate some icecream'}, 
            {id:17, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/17/2020", tags:['Love', 'Optimism', 'Joy'],message: 'Ate some icecream'},
            {id:18, color:"#FF3714", icon:"https://i.imgur.com/r1uqWbZ.png", date: "2/16/2020", tags:['Rage', 'Anger', 'Annoyance'],message: 'Ate some burgers'},
            {id:19, color:"#23b526", icon:"https://i.imgur.com/1R82UKp.png", date: "2/15/2020", tags:['Joy', 'Optimism', 'Love'],message: 'Ate some icecream'},
          ],
    
            isModalVisible: false,
            value: 'May 2020'
        };
 
constructor(props) {
    super(props);
    
  }

  cardClickEventListener = (item) => {
    Alert.alert(item.message);
  }

  tagClickEventListener = (tagdate) => {
    Alert.alert(tagdate);
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {}}>
        {/* Add {this.tagClickEventListener(tag)}} to make the tag's do something when clicked but we prob dont need that shit */}
          <Text>{tag}</Text>
        </TouchableOpacity> 
      );
    })
  }

  updateEntries(){
    const self = this;

    var temp = self.state.data;

    var icons = {
      neutral: 'https://i.imgur.com/XD8gBGr.png',
      great:'https://i.imgur.com/1R82UKp.png',
      good: 'https://i.imgur.com/UTUIdBX.png',
      bad: 'https://i.imgur.com/N6d2HMQ.png',
      horrible: 'https://i.imgur.com/r1uqWbZ.png'
    };

    var colors = {
      neutral: "#fed41c",
      great:"#23b526",
      good: "#a1df39",
      bad: "#fd7c1a",
      horrible: "#FF3714"
    };

    
    //proof of concept
    //take the first 19 entries from the database and add the mood values to the corresponding object
    firebase.queryDataUserOnlyLimit('feelingsData',9).then(function (documents){



      if(documents.length > 0){
      console.log(documents);
      numEntries = documents.length
      for(i = 0; i<numEntries; i++){
        
        temp[i].tags = documents[i].name;
        temp[i].icon = icons[documents[i].happinessLevel];
        temp[i].color = colors[documents[i].happinessLevel];


      }

      temp = temp.slice(0,numEntries);

      self.setState({data:temp});
      }
      else{
        Alert.alert('You dont have any entries');

      }
    })


  }

  componentDidMount(){

    this.updateEntries();

  }

  setDate = (val) => {
    this.setState({value: val});
  };

  render() {
    return (

      <View style={styles.container}>
          <Appbar.Header>
          <Appbar.Content title="History of Moods " />
              {/* <Appbar.Action icon="calendar" onPress={this.toggleModal} />             */}
          </Appbar.Header>
        <FlatList 
              style={styles.notificationList}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.id.toString();
              }}
              renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {borderColor:item.color}]} onPress={() => {this.cardClickEventListener(item)}}>
                <View style={styles.cardContent}>
                    <Image style={[styles.image, styles.imageContent]} source={{uri: item.icon}}/>
                    <Text style={styles.date}>{item.date}</Text>
                    <View style={[styles.cardContent, styles.tagsContent]}>
                    {this.renderTags(item)}
                  </View>
                </View> 
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
    }
}

export default HistoryRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  icon:{
    width:30,
    height:30,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    flexWrap:'wrap'
  },
  image:{
    width:80,
    height:80,
    borderRadius:30,
  },
  date:{
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 10,
    alignSelf: 'center',
    color: '#eff0f1',
    position: 'absolute',
    height: 120,
    paddingLeft:155,

  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
      modal: {
        backgroundColor: "white",
        // height: 200,
    },
});   